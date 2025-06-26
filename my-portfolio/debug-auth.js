// Debug Authentication Script
// Run this in your browser console when on the Skills/Projects page

console.log("=== AUTHENTICATION DEBUG ===");

// Check if user is signed in
const auth = window.firebase?.auth?.();
if (auth && auth.currentUser) {
  console.log("✅ User is signed in");
  console.log("User email:", auth.currentUser.email);
  console.log("User ID:", auth.currentUser.uid);
  console.log("ID Token exists:", !!auth.currentUser.accessToken);
} else {
  console.log("❌ User is NOT signed in");
}

// Check admin email from environment
console.log("Admin email from env:", import.meta.env.VITE_ADMIN_EMAIL);

// Check if admin status matches
const userEmail = auth?.currentUser?.email;
const adminEmail =
  import.meta.env.VITE_ADMIN_EMAIL || "ash1sh.1hakur10@gmail.com";
console.log("Is Admin?", userEmail === adminEmail);

console.log("=== END DEBUG ===");
