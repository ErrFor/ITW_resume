// Execute function when the page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    const sections_links = document.querySelectorAll("section"); // Get all sections
    const navLinks = document.querySelectorAll("nav a"); // Get all navigation links

    // Function to handle scroll position and update navigation link classes
    function onScroll() {
        let current = "";

        // Iterate through each section
        sections_links.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id"); // ID of the current section
            }
        });

        // Remove 'active' class from all links
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.href.includes(current)) {
                link.classList.add("active"); // Add 'active' class to the link corresponding to the current section
            }
        });
    }

    // Handle scroll event
    window.addEventListener("scroll", onScroll);

    // Text for typing effect
    const text = "On this page, you can learn more about me and my skills. Enjoy watching it!";
    const textElement = document.getElementById('text'); // Get the element to display the text
    const hiddenTextElement = document.getElementById('hiddenText'); // Get the hidden element

    // Function to add text one character at a time
    function typeWriter(text, i) {
        if (i < text.length) {
            textElement.innerHTML += text.charAt(i);
            i++;
            // Delay before adding the next letter
            setTimeout(function() {
                typeWriter(text, i);
            }, 50);
        } else {
            hiddenTextElement.style.opacity = 1; // Show text after animation is finished
        }
    }

    // Start the typing effect
    typeWriter(text, 0);

    // Attach click event listeners to all anchor links with hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const navHeight = 60; // Height of the navigation bar
            const targetId = this.getAttribute('href'); // Get the href attribute of the clicked anchor
            const targetElement = document.querySelector(targetId); // Find the target element in the DOM

            // If the target element exists, scroll to it smoothly
            if (targetElement) {
                const targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slideNumberElement = document.querySelector('.slide-number');

    // Function to update the slide number text
    function updateSlideNumber() {
        slideNumberElement.textContent = `${currentSlide + 1}/${totalSlides}`; // Update slide number
    }

    // Navigate to the previous slide
    document.querySelector('.prev').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        updateSlideNumber();
    });

    // Navigate to the next slide
    document.querySelector('.next').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
        updateSlideNumber();
    });

    updateSlideNumber();
    slides[currentSlide].classList.add('active'); // Show first slide

    // Toggle sections on button click
    let currentSectionIndex = 0;
    const sections = document.querySelectorAll('.skills-section');
    const totalSections = sections.length;
    const toggleButton = document.querySelector('.toggle');
    let isInitialLoad = true;

    // Function to toggle between sections
    function toggleSection(index) {
        sections.forEach((section, idx) => {
            section.classList.remove('active', 'flip-in');
            if (idx === index) {
                section.classList.add('active');
                // Add animation class to the current active section
                if (!isInitialLoad) {
                    setTimeout(() => section.classList.add('flip-in'), 25);
                }
            }
        });
    }
        
    toggleButton.addEventListener('click', () => {
        currentSectionIndex = (currentSectionIndex + 1) % totalSections;
        isInitialLoad = false;
        toggleSection(currentSectionIndex);
        // Update button text
        toggleButton.textContent = currentSectionIndex === 0 ? 'Soft Skills' : 'Hard Skills';
    });

        // Initialize first section as active with animation
    toggleSection(currentSectionIndex);

    // Function for "#interest" section blur effect
    document.querySelectorAll('.brain-quadrant').forEach(function(quadrant) {
        quadrant.addEventListener('mouseenter', function() {
            document.getElementById('interests').classList.add('blur');
        });
        quadrant.addEventListener('mouseleave', function() {
            document.getElementById('interests').classList.remove('blur');
        });
    }); 

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const form = event.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.ok) {
                var thankYouMessage = document.getElementById('thankyouMessage');
                thankYouMessage.style.display = 'flex'; // Display thank you message
                setTimeout(function() {
                    thankYouMessage.style.display = 'none'; // Hide message after 5 seconds
                }, 5000);
                form.reset(); // Clear the form
            } else {
                console.error('Server response was not "success":', result);
                alert("There was an error sending your message1. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There was an error sending your message. Please try again.");
        });
    });

    var navToggle = document.querySelector('.nav-bars');
    var navMenu = document.querySelector('.right-side');
    var content = document.querySelector('main');

    // Toggle menu class 'active' on hamburger icon click
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // Calculate the height of the open menu
        var menuHeight = navMenu.offsetHeight;

        // Add padding if the menu is active, otherwise remove it
        if (navMenu.classList.contains('active')) {
            content.style.paddingTop = menuHeight + 'px';
        } else {
            content.style.paddingTop = '0px';
        }
    });
});  