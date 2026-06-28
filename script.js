const blogs = [
  {
    name: "Anita",
    title: "From Campus to Data Analyst",
    story: "I started with small projects, improved SQL skills, and got my first analyst role through networking.",
    email: "anita.connect@example.com"
  },
  {
    name: "Rohan",
    title: "How I Landed My Internship",
    story: "I tailored every resume, practiced interviews weekly, and reached out to alumni for referrals.",
    email: "rohan.journey@example.com"
  }
];

const roles = [
  {
    title: "Frontend Intern",
    organization: "PixelWorks",
    type: "Internship",
    email: "jobs@pixelworks.example"
  },
  {
    title: "Business Analyst",
    organization: "Nexa Consulting",
    type: "Full-Time",
    email: "careers@nexa.example"
  }
];

const helpers = [
  {
    name: "Maya",
    support: "Resume review and interview prep",
    email: "maya.help@example.com"
  },
  {
    name: "Joseph",
    support: "Referral guidance for software roles",
    email: "joseph.referrals@example.com"
  }
];

const blogForm = document.querySelector("#blog-form");
const blogStatus = document.querySelector("#blog-status");
const blogListEl = document.querySelector("#blog-list");
const blogSearchEl = document.querySelector("#blog-search");

const roleForm = document.querySelector("#role-form");
const roleListEl = document.querySelector("#role-list");
const roleSearchEl = document.querySelector("#role-search");

const helpForm = document.querySelector("#help-form");
const helpListEl = document.querySelector("#help-list");
const helpSearchEl = document.querySelector("#help-search");

function renderBlogs(items) {
  if (!items.length) {
    blogListEl.innerHTML = "<li>No blogs found for this search.</li>";
    return;
  }

  blogListEl.innerHTML = items
    .map((blog) => {
      return `<li><strong>${blog.title}</strong> by ${blog.name}<br>${blog.story}<br>Reach out: ${blog.email}</li>`;
    })
    .join("");
}

function renderRoles(items) {
  if (!items.length) {
    roleListEl.innerHTML = "<li>No matching roles found.</li>";
    return;
  }

  roleListEl.innerHTML = items
    .map((role) => {
      return `<li><strong>${role.title}</strong> • ${role.organization} • ${role.type}<br>Contact: ${role.email}</li>`;
    })
    .join("");
}

function renderHelpers(items) {
  if (!items.length) {
    helpListEl.innerHTML = "<li>No contacts found for this search.</li>";
    return;
  }

  helpListEl.innerHTML = items
    .map((helper) => {
      return `<li><strong>${helper.name}</strong> — ${helper.support}<br>Email: ${helper.email}</li>`;
    })
    .join("");
}

function filterItems(items, searchQuery, mapper) {
  if (!searchQuery) {
    return items;
  }

  return items.filter((item) => mapper(item).toLowerCase().includes(searchQuery));
}

blogForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(blogForm);
  const entry = {
    name: String(formData.get("name") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    story: String(formData.get("story") || "").trim(),
    email: String(formData.get("email") || "").trim()
  };

  blogs.unshift(entry);
  renderBlogs(blogs);
  blogStatus.textContent = `Published! Thanks ${entry.name}, your journey is now live.`;
  blogForm.reset();
});

roleForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(roleForm);
  const entry = {
    title: String(formData.get("title") || "").trim(),
    organization: String(formData.get("organization") || "").trim(),
    type: String(formData.get("type") || "").trim(),
    email: String(formData.get("email") || "").trim()
  };

  roles.unshift(entry);
  renderRoles(roles);
  roleForm.reset();
});

helpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(helpForm);
  const entry = {
    name: String(formData.get("name") || "").trim(),
    support: String(formData.get("support") || "").trim(),
    email: String(formData.get("email") || "").trim()
  };

  helpers.unshift(entry);
  renderHelpers(helpers);
  helpForm.reset();
});

blogSearchEl.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const filtered = filterItems(blogs, query, (blog) => `${blog.title} ${blog.story} ${blog.name}`);
  renderBlogs(filtered);
});

roleSearchEl.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const filtered = filterItems(roles, query, (role) => `${role.title} ${role.organization} ${role.type}`);
  renderRoles(filtered);
});

helpSearchEl.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const filtered = filterItems(helpers, query, (helper) => `${helper.name} ${helper.support}`);
  renderHelpers(filtered);
});

renderBlogs(blogs);
renderRoles(roles);
renderHelpers(helpers);
