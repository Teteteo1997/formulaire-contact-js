// 1. Sélection des éléments HTML dont nous avons besoin
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');
const statusMessage = document.getElementById('status-message');

// 2. Écoute de l'événement de soumission du formulaire
contactForm.addEventListener('submit', async function (event) {
  // Empêche le rechargement automatique de la page
  event.preventDefault();

  // Récupération des valeurs saisies par l'utilisateur
  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim()
  };

  // --- ÉTAT 1 : Chargement en cours ---
  showStatus('Envoi de votre message en cours...', 'info');
  submitBtn.disabled = true;

  try {
    // Appel API avec la fonction fetch() vers une API de test
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Vérification de la réponse du serveur
    if (!response.ok) {
      throw new Error('Erreur lors de l’envoi au serveur.');
    }

    const data = await response.json();
    console.log('Réponse du serveur :', data);

    // --- ÉTAT 2 : Succès ---
    showStatus('Votre message a été envoyé avec succès !', 'success');
    contactForm.reset(); // Vide les champs du formulaire

  } catch (error) {
    // --- ÉTAT 3 : Erreur ---
    console.error('Détails de l’erreur :', error);
    showStatus('Une erreur est survenue. Veuillez réessayer.', 'error');

  } finally {
    // Dans tous les cas, on réactive le bouton à la fin
    submitBtn.disabled = false;
  }
});

/**
 * Fonction utilitaire pour afficher un message de statut à l'écran
 */
function showStatus(message, type) {
  statusMessage.textContent = message;
  // Réinitialise les classes
  statusMessage.className = '';
  // Ajoute la classe correspondante (info, success ou error)
  statusMessage.classList.add(type);
}
