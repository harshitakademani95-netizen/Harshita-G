import os
from dulwich.repo import Repo
import pathspec

def main():
    root = os.path.abspath(".")
    print("Checking repository in:", root)
    
    # Read .gitignore patterns
    gitignore_path = os.path.join(root, ".gitignore")
    patterns = []
    if os.path.exists(gitignore_path):
        with open(gitignore_path, "r", encoding="utf-8") as f:
            patterns = f.read().splitlines()
    spec = pathspec.PathSpec.from_lines("gitwildmatch", patterns) if "pathspec" in globals() else None

    # Init repo if not exists
    if not os.path.exists(os.path.join(root, ".git")):
        print("Initializing new Git repository...")
        repo = Repo.init(root)
    else:
        print("Found existing Git repository.")
        repo = Repo(root)

    print("Repo initialized at:", repo.path)

if __name__ == "__main__":
    main()
