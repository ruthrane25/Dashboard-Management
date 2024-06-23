import os

# Function to search for "localhost" in files
def search_for_localhost(directory):
    localhost_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js') or file.endswith('.jsx') or file.endswith('.env'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.read()
                    if 'localhost' in content:
                        localhost_files.append(file_path)
    return localhost_files

# Search for "localhost" in the client folder
localhost_files = search_for_localhost(client_folder_path)
localhost_files
