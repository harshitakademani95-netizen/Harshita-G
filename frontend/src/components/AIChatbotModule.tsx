'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  ShieldAlert,
  Volume2,
  RefreshCw,
  MessageSquare,
  Mic,
  Square,
  X,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { sendChatMessage } from '@/lib/api';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  disclaimer?: string;
  timestamp: string;
}

export const AIChatbotModule: React.FC = () => {
  const { t, language } = useLanguage();

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Voice recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const langCodes: Record<string, string> = {
    kn: 'kn-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    ta: 'ta-IN',
    mr: 'mr-IN',
    en: 'en-IN',
  };

  // Recording timer
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Clean up audio tracks and recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startVoiceRecording = async () => {
    setVoiceError(null);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        t(
          'chat.speechUnsupported',
          'Speech recognition is not supported in this browser. Please type your agriculture question directly.'
        )
      );
      return;
    }

    // Request microphone permission gracefully
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }
    } catch (err: any) {
      console.warn('Microphone permission denied or error:', err);
      setVoiceError(
        t(
          'chat.micDenied',
          'Microphone permission was denied. Please allow microphone access in your browser or type your question below.'
        )
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = langCodes[language] || 'en-IN';

      recognition.onstart = () => {
        setIsRecording(true);
        setRecordingSeconds(0);
      };

      recognition.onresult = (event: any) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        const cleaned = fullTranscript.trim();
        if (cleaned) {
          setInput(cleaned);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error in chat:', event.error);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setVoiceError(
            t(
              'chat.micDenied',
              'Microphone permission was denied. Please allow microphone access in your browser or type your question below.'
            )
          );
          stopVoiceRecording(false);
        } else if (event.error !== 'no-speech') {
          setVoiceError(
            t(
              'chat.speechError',
              'Voice recognition interrupted. You can edit the text or try again.'
            )
          );
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setVoiceError(
        t('chat.startError', 'Could not start voice recognition. Please try again or type your question.')
      );
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = (keepTranscript: boolean = true) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsRecording(false);

    if (!keepTranscript) {
      setInput('');
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const cancelVoiceRecording = () => {
    stopVoiceRecording(false);
    setVoiceError(null);
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: t(
        'chat.welcome',
        'Hello! I am your AI Crop Doctor. Ask me anything about plant diseases, yellowing leaves, natural remedies (Neem, Trichoderma), soil testing (NPK/pH), seed germination, or weather precautions.'
      ),
      disclaimer: t(
        'chat.disclaimer',
        'Guidance provided is for agronomic reference. Consult local extension agents for severe field outbreaks.'
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Synchronize initial welcome message when user changes language
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [
          {
            id: 'welcome',
            sender: 'bot',
            text: t(
              'chat.welcome',
              'Hello! I am your AI Crop Doctor. Ask me anything about plant diseases, yellowing leaves, natural remedies (Neem, Trichoderma), soil testing (NPK/pH), seed germination, or weather precautions.'
            ),
            disclaimer: t(
              'chat.disclaimer',
              'Guidance provided is for agronomic reference. Consult local extension agents for severe field outbreaks.'
            ),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [language, t]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const suggestedQuestions = [
    t('chat.q1', 'My tomato leaves are turning yellow. What should I check?'),
    t('chat.q2', 'How do I treat Early Blight with natural low-chemical remedies?'),
    t('chat.q3', 'What are the symptoms of low nitrogen and how to fix it naturally?'),
    t('chat.q4', 'How do I perform a paper towel seed germination test?'),
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await sendChatMessage(query, language, 'Tomato');
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.response,
        disclaimer: data.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: t('chat.error', 'Unable to reach AI Doctor service. Please check backend connection.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langCodes: Record<string, string> = {
        kn: 'kn-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        mr: 'mr-IN',
        en: 'en-IN',
      };
      utterance.lang = langCodes[language] || 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-semibold mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{t('chat.badge', 'Intelligent Agronomy Chatbot')}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {t('nav.chat', 'AI Agriculture Chatbot')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t(
            'chat.subtitle',
            'Chat with the specialized agriculture AI assistant for organic recommendations, plant pathology troubleshooting, and fertilizer guidelines.'
          )}
        </p>
      </div>

      {/* Chat Window */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-[600px] overflow-hidden">
        {/* Suggested Queries Header */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap px-1">
            {t('chat.suggested', 'Suggested:')}
          </span>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-800 text-xs border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm space-y-2 shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 pb-1 border-b border-white/20 dark:border-slate-700/60">
                  <span className="font-bold">
                    {m.sender === 'user' ? t('chat.you', 'You (Farmer)') : t('chat.bot', 'AI Crop Doctor')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{m.timestamp}</span>
                    {m.sender === 'bot' && (
                      <button
                        onClick={() => handleSpeak(m.text)}
                        className="hover:opacity-100 p-0.5 rounded cursor-pointer"
                        title={t('chat.readAloud', 'Read aloud')}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="leading-relaxed whitespace-pre-wrap">{m.text}</div>

                {m.disclaimer && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{m.disclaimer}</span>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 shrink-0 shadow-sm mt-0.5">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{t('chat.formulating', 'AI Crop Doctor is formulating agronomic advice...')}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          {/* Helpful Error Notice */}
          {voiceError && (
            <div className="mb-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-between text-xs text-amber-800 dark:text-amber-200">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{voiceError}</span>
              </span>
              <button
                type="button"
                onClick={() => setVoiceError(null)}
                className="p-1 rounded-lg hover:bg-amber-200/50 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 transition-colors cursor-pointer"
                aria-label="Dismiss error"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Active Voice Recording Controls */}
          {isRecording ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute" />
                  <span className="w-3 h-3 rounded-full bg-red-600 relative" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400">
                    <Mic className="w-3.5 h-3.5 animate-pulse" />
                    <span>{t('chat.recording', 'Recording voice...')}</span>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded-md bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200">
                      {Math.floor(recordingSeconds / 60)}:{('0' + (recordingSeconds % 60)).slice(-2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate max-w-xs sm:max-w-md">
                    {input || t('chat.speakNow', 'Speak your crop or soil question now...')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={cancelVoiceRecording}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  title={t('chat.cancelRecording', 'Cancel recording')}
                >
                  <X className="w-3.5 h-3.5 text-red-500" />
                  <span>{t('chat.cancelBtn', 'Cancel')}</span>
                </button>

                {/* Stop & Review Button */}
                <button
                  type="button"
                  onClick={() => stopVoiceRecording(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                  title={t('chat.stopRecording', 'Stop & review message')}
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>{t('chat.stopReviewBtn', 'Stop & Review')}</span>
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* Microphone Recording Button */}
              <button
                type="button"
                onClick={startVoiceRecording}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0 shadow-2xs group"
                title={t('chat.recordVoice', 'Record voice message')}
                aria-label="Record voice message"
              >
                <Mic className="w-5 h-5 group-hover:scale-105 transition-transform" />
              </button>

              {/* Editable Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder', 'Type or record your agriculture question...')}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white transition-colors cursor-pointer shrink-0 shadow-sm"
                aria-label="Send query"
                title={t('chat.send', 'Send question')}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
