//import { handleSubmit } from '../client/js/formHandler';
import { handleSubmit } from '../client/js/formHandler';

//import handleSubmit from '../client/js/formHandler';
import '../client/styles/style.scss';

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const form = document.getElementById('urlForm'); 
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleSubmit(event); 
    });
});

//export { handleSubmit };
export default handleSubmit;
