# QSR-Food-Ordering-App

A full-featured mobile application built with React Native, tailored for Quick Service Restaurants (QSR). It streamlines the dine-in and takeaway experience by enabling users to place customized orders, skip billing lines, and receive real-time updates on order status.

## Features

- **Dine-in and Takeaway Modes**  
  Easily switch between dine-in or takeaway to skip the billing queue and avoid service tips.

- **Secure User Authentication**  
  Sign up and log in with Firebase Authentication for a secure experience.

- **Real-Time Order Management**  
  Orders are managed through Firestore, with a token system sent to the kitchen for preparation.

- **Dynamic Cart**  
  Users can add, remove, or adjust quantities of items in real-time. Cart badge updates instantly.

- **Search and Filter**  
  Quickly find menu items using a responsive search bar with a "Clear" button.

- **Expandable Menu Sections**  
  Categorized, collapsible menu sections improve navigation and readability.

- **Local Notifications**  
  Users receive alerts when their order is ready for pickup.

- **Accurate Pricing**  
  Prices update in real-time based on cart contents and customization.

- **Improved Navigation**  
  Seamless screen transitions using `react-navigation` enhance user flow.

##  App Flow

1. **User Login/Signup**  
   Firebase handles user authentication.  
   
2. **Menu Browsing**  
   Menu is displayed in categorized, expandable sections.  

3. **Item Customization and Cart**  
   Add customizations, manage quantities, and view real-time cart summary.

4. **Payment and Order Placement**  
   Once items are finalized, payment is made within the app.

5. **Token Generation and Order Tracking**  
   After placing an order, a unique token is generated and sent to the kitchen.    

6. **Order Pickup**  
   When the order is ready, staff announces the token number or customer name for pickup.

##  Completed Enhancements

- Refined cart logic (min quantity = 1, remove on 0)
- Dynamic cart badge in header
- Improved price calculation logic
- Clear search button and better menu layout spacing
- Accurate order flow and status updates

## ⚠ Features Not Implemented (Due to Time Constraints)

- OTP-based phone authentication
- "Forgot Password" flow
- Custom drawer navigation

These can be considered for future development and can add many more features.

## 🛠 Tech Stack

- **React Native**
- **Firebase Authentication**
- **Firestore (NoSQL Database)**
- **React Navigation**
- **Expo Notifications**

##  Intended Use

This app was built to enhance operational efficiency and customer satisfaction at QSRs by:

- Reducing wait times
- Eliminating billing counter congestion
- Streamlining kitchen processing with token IDs
- Offering a modern, digital-first dining experience



##  Author

**Sahit Botta**  
[Portfolio](https://sahitbotta.com) • [GitHub](https://github.com/sahitkaran) • [Email](mailto:sahitkbotta@gmail.com)

---

##  License

This project is open-source and available under the [MIT License](LICENSE).

