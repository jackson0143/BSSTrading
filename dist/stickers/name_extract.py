import os
dir_path = os.path.dirname(os.path.realpath(__file__))
dir_list = os.listdir(dir_path)

print([s.replace('.png', '') for s in dir_list])