const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const statusMessage = document.getElementById('status-message');

contactForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  // 1. Indiquer à l'utilisateur que l'envoi est en cours
  showStatus('Envoi de votre message en cours...', 'info');
  submitBtn.disabled = true;

  // 2. Récupérer les données du formulaire
  const formData = new FormData(contactForm);
  
  // 3. Ajouter la clé Web3Forms
  formData.append("access_key", "c7f24781-6bcc-4aaa-bfb7-a51dce30b452");

  try {
    // 4. Envoyer les données à Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      // Succès : affichage du message vert et nettoyage du formulaire
      showStatus('Votre message a bien été envoyé ! Vérifiez votre boîte mail.', 'success');
      contactForm.reset();
    } else {
      throw new Error(data.message);
    }

  } catch (error) {
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
