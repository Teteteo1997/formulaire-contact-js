const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const statusMessage = document.getElementById('status-message');

contactForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  // --- ÉTAT 1 : Chargement en cours ---
  showStatus('Envoi de votre message en cours...', 'info');
  submitBtn.disabled = true;

  // Préparation des données du formulaire pour Netlify
  const formData = new FormData(contactForm);

  try {
    // On envoie la requête directement à Netlify (à la racine "/")
    const response = await fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l’envoi à Netlify.');
    }

    // --- ÉTAT 2 : Succès ---
    showStatus('Votre message a bien été reçu par Netlify !', 'success');
    contactForm.reset();

  } catch (error) {
    // --- ÉTAT 3 : Erreur ---
    console.error('Détails de l’erreur :', error);
    showStatus('Une erreur est survenue lors de l’envoi.', 'error');

  } finally {
    submitBtn.disabled = false;
  }
});

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = '';
  statusMessage.classList.add(type);
}
