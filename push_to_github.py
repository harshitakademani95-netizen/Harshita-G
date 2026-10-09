"""
Bela Mitra - Push to GitHub Utility
Run: python push_to_github.py <github_repo_url>
Example: python push_to_github.py https://github.com/your-username/bela-mitra.git
"""
import sys
import os
from dulwich.repo import Repo
from dulwich import porcelain

def main():
    if len(sys.argv) < 2:
        print("Usage: python push_to_github.py <remote_url>")
        print("Example: python push_to_github.py https://github.com/username/bela-mitra.git")
        return

    remote_url = sys.argv[1].strip()
    root = os.path.abspath(".")
    repo = Repo(root)
    
    # Configure remote
    config = repo.get_config()
    config.set(('remote', 'origin'), 'url', remote_url.encode('utf-8'))
    config.write_to_path()
    print(f"Configured remote 'origin' -> {remote_url}")
    
    print("Pushing to remote repository (main branch)...")
    try:
        porcelain.push(repo, remote_url, refspecs=[b"refs/heads/master:refs/heads/main"])
        print("Push succeeded!")
    except Exception as e:
        print("Push encountered an issue (authorization or network required):", e)
        print("\nIf you are using GitHub credentials, you can push securely via Git or GitHub CLI:")
        print(f"git remote add origin {remote_url}")
        print("git branch -M main")
        print("git push -u origin main")

if __name__ == "__main__":
    main()
