/**
 * Funtion to format number into K M B format
 * @param {*} num
 * @returns K M B formatted number
 */
export const viewsNumberFormatter = (num) => {
  if (num) {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  }
  return num;
};

// format date to ago style string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 365) {
    const diffYears = Math.floor(diffDays / 365);
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }
  if (diffDays > 30) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
};

// random name generator
export const generateName = () => {
  const firstNames = [
    "John",
    "Jane",
    "Bob",
    "Alice",
    "David",
    "Emma",
    "Olivia",
    "Liam",
    "Noah",
    "Ethan",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Lee",
    "Garcia",
    "Davis",
    "Taylor",
    "Wilson",
    "Jackson",
    "Wright",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return firstName + " " + lastName;
};

// generate a random message
export const generateMessage = () => {
  const messages = [
    "Hey there! How are you today? 😊",
    "Hope you're doing well! 🌞",
    "It's great to see you! 😃",
    "Thanks for stopping by! 🙌",
    "Have a wonderful day! 🌈",
  ];

  const smileys = ["😊", "😃", "🙌", "👍", "🎉", "❤️"];

  const message = messages[Math.floor(Math.random() * messages.length)];
  const smiley = smileys[Math.floor(Math.random() * smileys.length)];

  return message + " " + smiley;
};
