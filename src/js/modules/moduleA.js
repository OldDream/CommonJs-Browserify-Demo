let moduleAtest = () => {
  console.log('moduleA loaded!!!!!!!');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ES6 promise here!')
    }, 1000);
  });
}

module.exports.test = moduleAtest