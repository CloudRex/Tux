@echo off
git add *
git reset HEAD botty.db
git reset HEAD src/settings.json
git reset HEAD src/access-levels.json
git reset HEAD src/user.config.json
git reset HEAD botty.db-journal
git status
