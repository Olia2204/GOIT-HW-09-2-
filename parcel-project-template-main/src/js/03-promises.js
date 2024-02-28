import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  
  let delayTime = e.currentTarget.delay.valueAsNumber;
  const delayAction = e.currentTarget.step.valueAsNumber;
  const promiseAmount = e.currentTarget.amount.valueAsNumber;
  

  for (let position = 1; position <= promiseAmount; position += 1) {
    createPromise(position, delayTime);
    delayTime += delayAction;
  };
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise.then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}