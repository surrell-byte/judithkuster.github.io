// ============================================
// MAIN INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initChatWidget();
    initFilterButtons();
    initContactForm();
    initSmoothScroll();
    highlightActiveNavLink();
});

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
}

// ============================================
// HIGHLIGHT ACTIVE NAVIGATION LINK
// ============================================

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// CHAT WIDGET FUNCTIONALITY
// ============================================

function initChatWidget() {
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatButton || !chatWidget) return;
    
    // Open/Close chat
    chatButton.addEventListener('click', function() {
        if (chatWidget.style.display === 'none' || chatWidget.style.display === '') {
            chatWidget.style.display = 'flex';
        } else {
            chatWidget.style.display = 'none';
        }
    });
    
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWidget.style.display = 'none';
        });
    }
    
    // Send message function
    function sendMessage() {
        if (!chatInput || !chatMessages) return;
        
        const userText = chatInput.value.trim();
        if (userText === '') return;
        
        // Add user message
        addMessage(userText, 'user');
        chatInput.value = '';
        
        // Generate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(userText);
            addMessage(botResponse, 'bot');
        }, 500);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate intelligent bot responses
    function generateBotResponse(userInput) {
        const input = userInput.toLowerCase();
        
        // Safari related
        if (input.includes('safari') || input.includes('wildlife')) {
            return "🦁 Africa offers incredible safari experiences! Kenya's Masai Mara, Tanzania's Serengeti, and Botswana's Okavango Delta are top choices. Would you like me to suggest a safari itinerary based on your interests?";
        }
        // Kenya
        else if (input.includes('kenya')) {
            return "🇰🇪 Kenya is perfect for the Great Migration in Masai Mara (July-October). You can also visit Amboseli for elephants with Kilimanjaro views. Want to know more about luxury lodges there?";
        }
        // Tanzania
        else if (input.includes('tanzania')) {
            return "🇹🇿 Tanzania offers Serengeti, Ngorongoro Crater, and Zanzibar. The best time for safaris is June-October. Would you like package recommendations?";
        }
        // South Africa
        else if (input.includes('cape town') || input.includes('south africa')) {
            return "🇿🇦 Cape Town is stunning! Visit Table Mountain, Cape Winelands, and nearby safari reserves. Would you like a combined itinerary?";
        }
        // Victoria Falls
        else if (input.includes('victoria falls') || input.includes('zimbabwe')) {
            return "🌊 Victoria Falls is spectacular! The best time to see the falls at peak flow is February-July. Activities include helicopter flights, white-water rafting, and sunset cruises.";
        }
        // Botswana
        else if (input.includes('botswana') || input.includes('okavango')) {
            return "🇧🇼 Botswana's Okavango Delta is a unique paradise. Experience mokoro canoe safaris and luxury camps. Best visited June-October for wildlife viewing.";
        }
        // Price/Cost
        else if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
            return "💰 Pricing varies by destination, season, and luxury level. A 7-day luxury safari typically starts from $4,500-$8,000 per person. Contact me for a personalized quote!";
        }
        // Best time
        else if (input.includes('best time') || input.includes('when to go')) {
            return "📅 The best time for safaris is June-October (dry season). For beaches, December-March is ideal. Let me know which destination you're interested in!";
        }
        // Accommodation
        else if (input.includes('hotel') || input.includes('lodge') || input.includes('stay')) {
            return "🏨 I work with the finest luxury lodges, tented camps, and boutique hotels across Africa. From intimate bush camps to 5-star resorts, I'll match you perfectly.";
        }
        // Contact
        else if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
            return "📧 You can reach me at judith@kuster.travel or call +27 12 345 6789. I'd love to help plan your African adventure!";
        }
        // Greetings
        else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            return "👋 Hello! I'm Judith's AI assistant. I can help with destination recommendations, safari planning, pricing, and more. What would you like to know about African travel?";
        }
        // Default
        else {
            return "🌍 Thank you for your message! I specialize in luxury African travel. Whether you're dreaming of a safari, beach getaway, or cultural tour, I'm here to help. What destinations interest you?";
        }
    }
    
    // Send button click
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    // Enter key press
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

// ============================================
// DESTINATIONS FILTER FUNCTIONALITY
// ============================================

function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-full-card');
    
    if (!filterBtns.length || !destinationCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter destinations with animation
            destinationCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            // Validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            if (formSuccess) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                }, 3000);
            } else {
                alert('Thank you! Your message has been sent. I\'ll get back to you within 24 hours.');
                contactForm.reset();
            }
        });
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .destination-card, .testimonial-card, .destination-full-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Call scroll animations after a short delay
setTimeout(initScrollAnimations, 100);

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize if open
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn i');
        
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileBtn) {
                mobileBtn.classList.remove('fa-times');
                mobileBtn.classList.add('fa-bars');
            }
        }
    }, 250);
});

console.log('Website loaded successfully! ✓');