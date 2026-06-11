# VitalSync - User Prompt History

This document contains a chronological record of the instructions and feature requests you provided to build and refine the VitalSync application.

### Initial Setup & UI
1. Generate the initial screens and UI for **VitalSync**, an elite health optimization app.
2. Ensure the UI feels premium, using modern glassmorphism, dynamic animations, and dark mode aesthetics.

### Authentication & Database (Phase 1)
3. Set up **Firebase Authentication** for user signups and logins.
4. Set up **MySQL** database using **Prisma ORM** to store user profiles, health records, goals, and connected devices.
5. Fix Prisma schema sync errors.

### AI Integration
6. "[REDACTED_API_KEY] use this key to add ai chatbot"
7. "ye it should be avilable globally across all pages" *(Regarding chatbot placement)*
8. "no" *(Regarding whether the chatbot should have access to read your personal health records for privacy reasons)*

### Bug Fixes & Refinements
9. "in goals page, create new goal is not working. health records are also not opening. achievments page is also not opening device page is also not opening"
10. Fix React Rules of Hooks violations in the Chatbot component.

### Architecture Migration (Phase 2)
11. "can i completely make my database in firebase?"
12. "yes i want to completely rely on firebase"
13. "yes go with this plan" *(Approving the complete tear-down of MySQL/Prisma in favor of Firestore)*
14. Fix various Firebase Admin initialization errors (Service Account formatting and missing databases).

### Final Polish
15. "on sign in page, sign in thru google and apple is not working"
16. "also the profile should change with name of person who is signing in, currently its same name every time i login"
17. "now do one thing, create me a prompt docs and store all the prompts in that docs that i have give so far."
18. "from now on store all my prompts in user_prompts.md file"
19. "now create me a api docs that contains all api. create docs in above format. if possible can you directly create in notion"
20. "can you tell me tech stack that i have used till now"
21. "make changes in this as per our tech stack and give me in same format"
22. "Dashboard API error: Error: 9 FAILED_PRECONDITION: The query requires an index. You can create it here: [...] Records GET error: Error: 9 FAILED_PRECONDITION: The query requires an index. You can create it here: [...]"
23. "profile photo not coming when i logged in with google account"
24. "[Image] these features are not working (referring to the notifications, sync, and add buttons in the top nav)"
25. "why u are not understanding what i am trying to say. whenever a put new goal the card on dashboard should show that this goal is target and when i click on plus section it should show thsi much is left out of daily goal"
26. "on goals page the goal remove option should also there so that i can reset my old goals"
27. "currently no goals are there then why it showing this data."
28. "Would you like me to add a 'Reset Today's Data' button so you can easily clear your health records and start from zero for testing? do this"
29. "when i created new goal for 5000 daily steps it should come 0/5000 and when i click on plus sign and say i write 2000 it means 3000 left. this is how every card should work"
30. "still when i create new goal the card on dashboard should show 0/6000 and after i click plus sign and write 3000 the it should show 3000 left"
31. "when i create new goals all my cards should not show that number insted it should show 0/ that goal and then when i click on plus sign it shiuld show how much left"
32. "remove trends and community option from top bar"
33. "the goals tha i am storiing it should also store in my health records"
34. "i want that the health records should be separate it shpuld not be connected with my dashboard. my goals that i create it should get stored in health records without affecting dashboard."
35. "on challenges page add few more challenges so that when i click on view more challenges it should show some more and also create a option for creating a challenge and after creation , option on that craeted challenge of challenge completed."
36. "on every challenge make option for completed. so that it shows challenge completed."
37. "also on same page create a achievments section where whatever challenge i mar complete it should go in that achievments section"
38. "when i sign in with email and password with new user it first goes under various section to choose. it should go directly to dashboard."
39. "when i click on new account and it asks me all the details it should go back to sign up page and then write my e mail and password and then it should go directly on dashboard"
40. "now update my api docs with upto current time"
41. "update my prompt docs also"
