import os
from dulwich.repo import Repo
from dulwich.index import build_index_from_tree
import pathspec

def commit_changes():
    root = os.path.abspath(".")
    print(f"Working in: {root}")
    
    # Initialize Repo if needed
    git_dir = os.path.join(root, ".git")
    if not os.path.exists(git_dir):
        print("Initializing Git repository...")
        repo = Repo.init(root)
    else:
        print("Opening existing Git repository...")
        repo = Repo(root)
        
    # Read .gitignore patterns
    patterns = [
        ".git",
        ".git/*",
        ".env",
        ".env.*",
        "node_modules",
        "node_modules/*",
        "frontend/node_modules",
        "frontend/node_modules/*",
        ".next",
        ".next/*",
        "frontend/.next",
        "frontend/.next/*",
        "__pycache__",
        "__pycache__/*",
        "backend/__pycache__",
        "backend/__pycache__/*",
        "*.pyc",
        "*.pyo"
    ]
    gitignore_path = os.path.join(root, ".gitignore")
    if os.path.exists(gitignore_path):
        with open(gitignore_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    patterns.append(line)
                    
    spec = pathspec.PathSpec.from_lines("gitwildmatch", patterns)
    
    # Collect files
    files_to_add = []
    for dirpath, dirnames, filenames in os.walk(root):
        rel_dir = os.path.relpath(dirpath, root).replace("\\", "/")
        if rel_dir == ".":
            rel_dir = ""
            
        # Filter dirnames in-place to avoid descending into ignored dirs
        keep_dirs = []
        for d in dirnames:
            check_path = f"{rel_dir}/{d}" if rel_dir else d
            if d == ".git" or spec.match_file(check_path) or spec.match_file(check_path + "/"):
                continue
            keep_dirs.append(d)
        dirnames[:] = keep_dirs
        
        for f in filenames:
            rel_file = f"{rel_dir}/{f}" if rel_dir else f
            if spec.match_file(rel_file):
                continue
            files_to_add.append(rel_file)

    print(f"Total files identified to stage (excluding ignored): {len(files_to_add)}")
    
    # Stage files using dulwich porcelain or staging
    from dulwich import porcelain
    
    # Porcelain add
    porcelain.add(repo, files_to_add)
    print("Files staged successfully.")
    
    # Commit
    commit_msg = b"Add location-based live weather and update Bela Mitra branding"
    commit_id = porcelain.commit(
        repo,
        message=commit_msg,
        author=b"Bela Mitra Developer <dev@belamitra.ag>",
        committer=b"Bela Mitra Developer <dev@belamitra.ag>"
    )
    
    print(f"Commit created successfully: {commit_id.decode('ascii')}")
    print("Commit message: Add location-based live weather and update Bela Mitra branding")

if __name__ == "__main__":
    commit_changes()
