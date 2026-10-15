# Personal portfolio

A responsive static portfolio inspired by the supplied Rifat Rudro reference: navy background, pink and mint accents, code hero, experience, skills, education, projects, and contact.

## Customize

Edit `content.js` to update your name, title, bio, experience, skills, education, projects, email, and social links. Add photos and a resume to `assets/` and set their relative paths in the same file.

The contact form opens the visitor's email app when an email is configured. It does not use a backend or claim messages were sent. Unconfigured resume and social buttons explain what needs to be added.

## Preview

Open the root `index.html` directly, or run `node server.cjs` and open http://localhost:4173. No package installation is required.

## GitHub and hosting

Push this whole folder to GitHub. For GitHub Pages, choose your branch and the `/ (root)` folder in Settings → Pages. The root `index.html`, CSS, JavaScript, and `assets/` are the website source; keep them together.

For the existing Sites deployment, run `node scripts/build-static.cjs` to copy the public website into `dist/`. This generated folder is ignored by Git; edit the root files rather than the generated copies. The deployment manifest continues to publish `dist/` so only public website files are packaged.
