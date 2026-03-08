# Qasim Ayub | AI & Software Engineer Portfolio

A sleek, minimalistic, and high-performance static portfolio website built entirely with modern HTML, CSS, and Vanilla JavaScript. Tailored for a research-focused professional specializing in Machine Learning, AI, and Full-Stack Development.

## Features
- **Premium Dark Mode UI**: Built with carefully chosen colors (`#0d0d12` base) and custom CSS properties.
- **Micro-animations**: Smooth hover transitions, scroll reveal states utilizing `IntersectionObserver`, and subtle glowing effects.
- **Glassmorphism**: Modern frosted glass cards for skills and project display.
- **Fully Responsive**: Adapts natively to Mobile, Tablet, and Desktop screens using CSS Grid and Flexbox.

## Local Development
Since this is a static website, you do not need a complex build pipeline.
1. Clone the repository.
2. Open `index.html` in any web browser, or use a tool like Visual Studio Code's "Live Server" extension for hot reloading.

## Deployment to GitHub Pages (Free Hosting)
You can easily host this portfolio for free using GitHub Pages.

1. **Initialize Repository**:
   - Create a new public repository on your GitHub account.
   - Push these files (`index.html`, `styles.css`, `script.js`, `assets/`) to the `main` branch of that repository.

2. **Enable GitHub Pages**:
   - Navigate to your repository on GitHub.
   - Go to **Settings** > **Pages** (on the left sidebar).
   - Under "Build and deployment", select **Deploy from a branch**.
   - Under "Branch", select the `main` branch and the `/ (root)` folder, then click **Save**.

3. **Wait for Deployment**:
   - Wait 1-2 minutes for the GitHub Actions pipeline to build and deploy your site.
   - You can track the progress in the **Actions** tab.
   - Once completed, your live URL will be shown at the top of the Pages settings site.

## Customization
- **Images**: Replace the placeholder images in `assets/images` with your actual screenshots.
- **Details**: Open `index.html` and edit the text inside the `<section>` tags to add your personalized copy, project titles, and descriptions.
- **Links**: Update the `href` attributes in the social links and project cards to point to your live repos or stores.
