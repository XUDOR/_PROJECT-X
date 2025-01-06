document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content Loaded');

    const navLinks = document.querySelectorAll('.nav-menu a');
    const loadingIndicator = document.querySelector('.loading');
    const frontendLog = document.querySelector('.frontend-log .log-content');

    console.log('Frontend Log Element:', frontendLog); // Debug

    // Services Array
    const services = [
        { name: 'user', display: 'A | User Portal', ip: '127.0.0.1' },
        { name: 'database', display: 'B | Database', ip: '127.0.0.2' },
        { name: 'metrics', display: 'C | Metrics Console', ip: '127.0.0.3' },
        { name: 'company', display: 'D | Company IO', ip: '127.0.0.4' },
        { name: 'parser', display: 'E | Parser', ip: '127.0.0.5' },
        { name: 'communication', display: 'F | Communication', ip: '127.0.0.6' },
        { name: 'security', display: 'Z | Security Module', ip: '127.0.0.7' }
    ];

    // Update Service Status Function
    const updateServiceStatus = async () => {
        for (const service of services) {
            const serviceElement = document.querySelector(`[data-service="${service.name}"]`);
            if (!serviceElement) continue;

            try {
                const response = await fetch(`/api/${service.name}/health`);
                if (response.ok) {
                    // Service is CONNECTED
                    serviceElement.querySelector('.status-indicator').classList.remove('status-blue', 'status-red');
                    serviceElement.querySelector('.status-indicator').classList.add('status-green');
                    serviceElement.querySelector('span').textContent = 'CONNECTED';
                } else {
                    // Service is ONLINE but not CONNECTED
                    serviceElement.querySelector('.status-indicator').classList.remove('status-green', 'status-red');
                    serviceElement.querySelector('.status-indicator').classList.add('status-blue');
                    serviceElement.querySelector('span').textContent = 'ONLINE';
                }
            } catch {
                // Service is OFFLINE
                serviceElement.querySelector('.status-indicator').classList.remove('status-green', 'status-blue');
                serviceElement.querySelector('.status-indicator').classList.add('status-red');
                serviceElement.querySelector('span').textContent = 'OFFLINE';
            }

            // Always display the IP address
            serviceElement.querySelector('.service-ip').textContent = `IP: ${service.ip}`;
        }
    };

    // Call and Schedule Updates
    updateServiceStatus();
    setInterval(updateServiceStatus, 5000); // Update every 5 seconds

    // Navigation Handling
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const section = this.dataset.section;
            console.log('Nav clicked:', section); // Debug
            handleNavigation(section);
        });
    });

    // Event Logging System
    const EventLogger = {
        logFrontendEvent: (action, status = 'info') => {
            console.log(`[FRONTEND] ${action}`); // Debug
            const entry = document.createElement('div');
            entry.className = `log-entry ${status}`;
            entry.innerHTML = `
                <span>${new Date().toLocaleTimeString()}</span>
                <span>${action}</span>
                <span>${status.toUpperCase()}</span>
            `;
            if (frontendLog) {
                frontendLog.insertBefore(entry, frontendLog.firstChild);
            } else {
                console.error('Frontend log element not found');
            }
        },

        logServiceEvent: (service, message, status = 'info') => {
            console.log(`[SERVICE] ${service}: ${message}`); // Debug
            const serviceLog = document.querySelector(`[data-service="${service}"] .event-log`);
            if (serviceLog) {
                const entry = document.createElement('div');
                entry.className = `log-entry ${status}`;
                entry.innerHTML = `
                    <span>${new Date().toLocaleTimeString()}</span>
                    <span>${message}</span>
                    <span>${status.toUpperCase()}</span>
                `;
                serviceLog.insertBefore(entry, serviceLog.firstChild);
            }
        }
    };

    // Handle navigation with loading state
    function handleNavigation(section) {
        console.log(`[NAVIGATION] Switching to section: ${section}`); // Debug

        // Hide all sections
        const allSections = document.querySelectorAll('.grid-container');
        allSections.forEach(sec => sec.style.display = 'none');

        // Show the active section
        const activeSection = document.querySelector(`.grid-container.${section.toLowerCase()}-grid`);
        if (activeSection) {
            activeSection.style.display = 'block';
        } else {
            console.error(`[NAVIGATION] Section "${section}" not found.`);
        }
    }

    function showLoading() {
        loadingIndicator.style.display = 'block';
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    // Initial Updates (optional logging for starting state)
    EventLogger.logFrontendEvent('Application initialized and service status updates started', 'info');
});
