# Project Setup
Steps for running project =>
1. open project up in VS code or Sublime or whatever editor you use.
2. git clone https://github.com/yourusername/react-post-reader.git
3. cd react-post-reader
4. run yarn install from root directory which should be 'frontend-assignment-main'
5. once depedencies are updated you can run 'yarn start' to start dev server
6. in terminal 'cd packages/frontend' inside of frontend directory you can run 'jest' and this will run the tests.


# React Post Reader SPA

React Post Reader is a Single Page Application (SPA) designed to provide a streamlined experience for reading posts. Built with React, TypeScript, and CSS, it offers features like sender list, post ordering, search functionality, and more.

# Features
- Login Screen: Users can log in using their email.
- Sender List: Displays senders with post count, sorted alphabetically.
- Post List: Lists posts by individual senders, ordered by creation time.
- Post Ordering: Users can choose to order posts by most recent first or last.
- Search Functionality: Users can search for specific senders or posts.
- Deep-linkable Post List: Enables direct access to a sender's posts through a unique URL.
- Responsive Design: Adapts to various devices for an optimal user experience.
# Technologies
- React
- CSS
- TypeScript
- Jest
- Context API
- Babel


# License
MIT



## API
Fetch users
**GET:** `http://localhost:1338/register`

Fetch Posts
   **GET:** `http://localhost:1338/posts`
