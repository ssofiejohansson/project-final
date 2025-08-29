# Frontend part of Final Project

# Netlify Link:
(https://subscribee-project.netlify.app/)

Subscribee - A project by Oskar, Sofie & Sofia 

## The problem: 
People tend to forget which subscriptions they have and what the fee is and keep paying for them despite not using them.  

## Describe how you approached the problem, and what tools and techniques you used to solve it: 
To solve the problem, we created an application where the user can add all their subscriptions and display them on a dashboard. 

The dashboard show: 
¤ Quantity  
¤ Monthly and yearly cost 
¤ Subscription category 
¤ Status: active or inactive  
¤ Free trial and trial days, with count down
¤ Line graph of costs by month 
¤ Reminder for the next upcoming 3 days 
¤ Filtering by category 
¤ Sort by name, cost, reminder date and status 

The user can choose to get notifications by email on the set reminder date. 
When a subscription gets cancelled or change status to inactive, Beeatrice the bee notifies the user. 
She lets the user know how much the yearly save is and what they can spend the money on instead. 

## How did you plan? 
Daily standups for motivation and keep everyone on track.  
A board with tasks in Notion to get an overview. 
We decided early to focus on getting all the functionality running before we added any styling. 

## What technologies did you use? 
# Frontend
Core: HTML5, JavaScript (ES6+), React 
Build Tool: Vite 
Styling: Tailwind CSS, with Material Tailwind for UI components
Routing: React Router 
State Management: Zustand
Data Visualization: ApexCharts for graphs and charts
Icons: Heroicons 

# Backend 
Core: Node.js, Express.js 
Database: MongoDB with Mongoose as the ODM
Email Service: Nodemailer for sending emails
Task Scheduling: node-cron for recurring tasks
Authentication: Custom token-based authentication middleware

# Tooling & Deployment 
Version Control: Git 
Automation: GitHub Actions (workflow automation via .yml pipelines for tasks such as database updates) 
Hosting: Frontend on Netlify, Backend on Render 

## If you had more time, what would be next? 
An admin page to get an overview of and handle scheduled emails, users etc. 
Expand the focus on contribution to choose from different charity organisations.  