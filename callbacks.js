/*
let fruits = ['Apple', 'Banana', 'Mango', 'Strawberry', 'Carenberies', 'Guava'];
fruits.forEach((fruit, i) => {
	console.log(`in forEach outside TO ${i}: ${fruit}`);
	setTimeout(() => {
		console.log(`in forEach inside TO ${i}: ${fruit}`);
	}, 1000);
});

for(let i=0; i< fruits.length; i++) {
	console.log(`in for loop outside TO ${i}: ${fruits[i]}`);
	setTimeout(() => {
		console.log(`in for loop inside TO ${i}: ${fruits[i]}`);
	}, 1000);
}
*/


let callBackFunc = (error, success) => {
	if(error) {
		// console.log(error);
		console.log('no error is thrown');
		return;
	}
	
	console.log(success);
};

let addTwoNumber = (a, b, callBack) => {
	if(typeof a !== 'number') {
		callBack(new Error('first arg is not a number'));
		console.info('1 will not print');
		return;
	}
	
	if(typeof b !== 'number') {
		callBack(new Error('second arg is not a number'));
		console.info('2 will not print');
		return;
	}
	
	return callBack(null, a+b);
}

addTwoNumber('ab', 4, callBackFunc);