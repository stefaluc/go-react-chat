set -e

# build /dist
cd app/
npm run build

# temporarily add dist/ to version control
git add -f build/

# push to heroku then remove commit
git commit -m "Temp Heroku deploy commit" -n
git push heroku master --force
git reset --soft HEAD~1

# unstage generated files
git reset HEAD build/
