import { handleSubmit, initialize } from '../client/js/formHandler.js';

describe('Test handleSubmit function', () => {
  let form;

  beforeEach(() => {

      document.body.innerHTML = `
          <form id="urlForm">
              <input id="article-url" type="text" name="url" placeholder="Enter URL" required />
              <button id="submitButton" type="submit">Submit</button>
          </form>
      `;
      form = document.getElementById('urlForm'); 
      initialize(); //event listener

      window.alert = jest.fn(); 
  });

  afterEach(() => {
      document.body.innerHTML = '';
     
  });

  test('should add event listener for form submission', () => {
      const addEventListenerSpy = jest.spyOn(form, 'addEventListener');
      initialize(); 
      expect(addEventListenerSpy).toHaveBeenCalledWith('submit', expect.any(Function));
  });

  test('handleSubmit should prevent default behavior', () => {
      const preventDefault = jest.fn();
      const mockEvent = { preventDefault };
      
      handleSubmit(mockEvent);
      
      expect(preventDefault).toHaveBeenCalled();
  });

  test('should alert if URL is invalid', () => {
    
      const invalidUrl = '';
      document.getElementById('article-url').value = invalidUrl;


      handleSubmit({ preventDefault: () => {} });
      expect(window.alert).toHaveBeenCalledWith('Enter a valid URL');
  });
});
