# ssbu-toml-fixer
Updates names and categories of *.toml files in a directory using mod folder names.
Appropriately named mods will have their .toml files edited to have their "display_name"s and "category"s match their folder name.
New .toml files will be created if a mod is missing one.

# Preparation
Install node.js

I think the release should work as long as you have node, I don't really know.

If you want to build source.

In a terminal at the root level of the project, run
 - `npm i`
 - `tsc`

# Usage
Make sure your mod folder names match the format `{Category}-{Mod Name}`

{Category} is case-insensitive and can be any one of
 - `stage`
 - `ui`
 - `char`
   - `fighter` also works
 - `effect`
 - `param`
 - `audio`
   - `music` also works 
 - `misc`

Drag your "/mods" folder over `Start.bat`

# Example
For a mod folder named `Char-Cloud-03-Arctic Trooper`, this will create a (or edit an existing) `info.toml` file.

The display name will match the folder name. The category will be determined by the section before the first hyphen, in this case it will be set to "Fighter".
