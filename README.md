# Welcome to your Expo app 👋

/project/app/
├── \_layout.tsx (Root layout, app-wide styling)
├── index.tsx (Entry point, initial routing)
├── (auth)/  
│ ├── auth.tsx (sign-in/sign-up)
│ └── forgot-password.tsx  
├── (main)/ (Everything in this folder requires authentification)
│ ├── \_layout.tsx (Handles auth state)
│ ├── (tabs)/  
│ │ ├── \_layout.tsx (Defines tab styling)
│ │ ├── knock.tsx (Handles neighborly functionality & events)
│ │ ├── nearby.tsx (Displays nearby profiles)
│ │ ├── chats.tsx (List of chats)
│ │ └── profile.tsx (Edit and view profile, settings, rank, etc.)
│ ├── knock/
│ │ ├── \_layout.tsx
│ │ ├── action.tsx (lets you say you helped your neighbor)
│ │ ├── rank.tsx (shows your rank, perks, and logs past actions)
│ │ ├── info.tsx (repository of helpful information?)
│ ├── configuration/  
│ │ ├── \_layout.tsx (Shared layout for pages with a lot of options)
│ │ ├── settings/  
│ │ │ ├── index.tsx (Main settings page with links to subpages)
│ │ │ ├── subpage1.tsx  
│ │ │ ├── subpage2.tsx (etc.)
│ │ ├── create-event.tsx  
│ │ └── edit-profile.tsx  
│ ├── user/  
│ │ ├── \_layout.tsx  
│ │ └── [id].tsx (Specific profile)
│ ├── chat/  
│ │ ├── \_layout.tsx  
│ │ └── [id].tsx (Specific chat)
│ ├── events/  
│ │ ├── \_layout.tsx  
│ │ └── [id].tsx (Specific event)
└── [...missing].tsx (Catch-all for unmatched routes, e.g., 404 page)
