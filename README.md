# alx-project-nexus

# 🎬 CineScope  

CineScope is a **movie discovery app** that allows users to explore **trending**, **recommended**, and **searched** movies. The app fetches movie data from **The Movie Database (TMDb) API**, providing users with details like release date, ratings, and trailers. Users can also add movies to their **favorites** for easy access.  

## 🚀 Features  

✅ **Trending Movies** – View the hottest movies of the week.  
✅ **Recommended Movies** – Get personalized movie suggestions.  
✅ **Unlimited Search** – Find any movie, even if it's not trending or recommended.  
✅ **Movie Details** – See release dates, overviews, and ratings.  
✅ **Watch Trailers** – Play trailers with a single click.  
✅ **Favorites List** – Add or remove movies from your favorites.  
✅ **Smooth UI** – Modern, responsive, and visually appealing interface.  
✅ **User Authentication** – Login and signup functionality.  
✅ **Profile Management** – View and update user profiles.  
✅ **Progressive Web App (PWA)** – Installable on mobile and desktop devices for a native app experience.

## 📸 Screenshots  
## laptop view
![home page lightmode (before signup)](image.png)
![homepage darkmode](image-1.png)
![login page](image-2.png)
![signup page](image-3.png)
![homepage after signup](image-4.png)

## phone view
![PWA display](<WhatsApp Image 2025-03-11 at 05.04.31_5c338eb1.jpg>)
![home page](<WhatsApp Image 2025-03-11 at 05.04.30_a03ea1fd.jpg>)
![navigation menu](<WhatsApp Image 2025-03-11 at 05.04.30_30394e8e.jpg>)
![signup](<WhatsApp Image 2025-03-11 at 05.04.29_e96219e7.jpg>)
![profile](<WhatsApp Image 2025-03-11 at 05.04.29_34b0fbf2.jpg>)
![search functionality](<WhatsApp Image 2025-03-11 at 05.04.28_7f62ad58.jpg>)

## vercel live deployment : [cinescope movie app](https://cinescope-prudencegikundi-prudence-kendis-projects.vercel.app/)

## 🛠️ Tech Stack  

- **Frontend**: Next.js (React), TypeScript, Tailwind CSS  
- **Backend API**: TMDb API  
- **State Management**: React Context API  
- **Styling**: Tailwind CSS  
- **Package Manager**: npm / yarn  

## 📦 Installation  

1. Clone the repository:  
   ```sh
   git clone https://github.com/PrudenceGikundi/ALX-PROJECT-NEXUS.git
   cd cinescope
   ```

2. Install dependencies:  
   ```sh
   npm install
   ```

3. Set up environment variables:  
   Create a `.env.local` file and add your **TMDb API key**:  
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Run the app:  
   ```sh
   npm run dev
   ```

5. Open in your browser:  
   ```
   http://localhost:3000
   ```

## 📂 Folder Structure  

```
/cinescope
│── /components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── MovieCard.tsx
│   ├── WatchTrailerButton.tsx
│── /context
│   ├── FavoritesContext.tsx
│── /interfaces
│   ├── index.ts
│── /pages
│   ├── index.tsx (Home Page)
│── /utils
│   ├── api.ts
│── .env.local
│── package.json
│── README.md
```

## 🌍 API Integration  

The app fetches movies using the **TMDb API**.  
The following endpoints are used:  

- **Trending Movies:**  
  ```
  https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_API_KEY
  ```
- **Popular (Recommended) Movies:**  
  ```
  https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY
  ```
- **Search Movies:**  
  ```
  https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=MOVIE_NAME
  ```


## 🤝 Contributing  

1. Fork the repo and create a new branch.  
2. Make your changes and test thoroughly.  
3. Submit a pull request.  

## 📄 License  

This project is licensed under the **MIT License**.
