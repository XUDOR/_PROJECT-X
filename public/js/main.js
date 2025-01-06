document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements with console.log for debugging
    console.log('DOM Content Loaded');
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    const loadingIndicator = document.querySelector('.loading');
    const frontendLog = document.querySelector('.frontend-log .log-content');
    
    console.log('Frontend Log Element:', frontendLog); // Debug

    // Navigation handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            console.log('Nav clicked:', section); // Debug
            handleNavigation(section);
        });
    });

    // Event Logging System
    const EventLogger = {
        logFrontendEvent: (action, status = 'info') => {
            console.log('Attempting to log frontend event:', action); // Debug
            const entry = document.createElement('div');
            entry.className = `log-entry ${status}`;
            entry.innerHTML = `
                <span>${new Date().toLocaleTimeString()}</span>
                <span>${action}</span>
                <span>${status}</span>
            `;
            if (frontendLog) {
                frontendLog.insertBefore(entry, frontendLog.firstChild);
            } else {
                console.error('Frontend log element not found');
            }
        },

        logServiceEvent: (service, message, status = 'info') => {
            console.log('Logging service event:', service, message); // Debug
            const serviceLog = document.querySelector(`[data-service="${service}"] .event-log`);
            if (serviceLog) {
                const entry = document.createElement('div');
                entry.className = `log-entry ${status}`;
                entry.innerHTML = `
                    <span>${new Date().toLocaleTimeString()}</span>
                    <span>${message}</span>
                    <span>${status}</span>
                `;
                serviceLog.insertBefore(entry, serviceLog.firstChild);
            }
        }
    };

    // Handle navigation with loading state
    function handleNavigation(section) {
        console.log('Handling navigation:', section); // Debug
        showLoading();
        
        if (section === 'Events') {
            console.log('Triggering event simulation'); // Debug
            simulateSignupFlow();
        }
        
        setTimeout(() => {
            hideLoading();
            updateContent(section);
        }, 1000);
    }

    // Simulate signup flow
    function simulateSignupFlow() {
        console.log('Starting signup flow simulation'); // Debug
        
        // Immediately log the first event
        EventLogger.logFrontendEvent('User initiated signup', 'info');
        
        const events = [
            { time: 1000, service: 'user', message: 'Validating user data', status: 'info' },
            { time: 2000, service: 'database', message: 'Creating user record', status: 'success' },
            { time: 3000, service: 'communication', message: 'Sending welcome email', status: 'info' },
            { time: 4000, type: 'frontend', message: 'Signup completed successfully', status: 'success' }
        ];

        events.forEach(event => {
            setTimeout(() => {
                if (event.type === 'frontend') {
                    EventLogger.logFrontendEvent(event.message, event.status);
                } else {
                    EventLogger.logServiceEvent(event.service, event.message, event.status);
                }
            }, event.time);
        });
    }

    function showLoading() {
        loadingIndicator.style.display = 'block';
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    function updateContent(section) {
        console.log('Updating content for section:', section);
    }

    // Initial simulation (optional)
    // setTimeout(simulateSignupFlow, 1000);
});