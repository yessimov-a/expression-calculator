function eval() {
    // Do not use eval!!!
    return;
}

const check = (str) => {
    str = str.replace(/\s\s/g, ' ');    
    let a = str.match(/(\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)/g)[0];
    let b = str.match(/(\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)/g)[1];
    let symb = str.slice(a.length + 1, a.length + 2);
    let result = 0;
    if (symb === '/') {
        result = +a / +b;
    } else if (symb === '*') {
        result = +a * +b;
    } else if (symb === '+') {
        result = +a + +b;
    } else if (symb === '-') {
        result = +a - +b;
    }
    return result
}
 
const calculate = (expr) => {

    expr = expr.replace(/\s\s/g, ' ')

    while(/(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\/\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))|(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\*\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))/g.test(expr)) {
        expr = expr.replace(/(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\/\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))|(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\*\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))/, item => check(item));
    }
    while(/(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\+\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))|(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\-\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))/g.test(expr)) {
        expr = expr.replace(/(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\+\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))|(((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*))\s\-\s((\-*\d+\.\d+(e\-\d+)*)|(\-*\d+(e\-\d+)*)))/, item => check(item));
    }
    return expr
}

const expressionCalculator = (str) => {
    if((/\(/g.test(str) ? str.match(/\(/g).length : 0) !== (/\)/g.test(str) ? str.match(/\)/g).length : 0)) {
        throw new Error('ExpressionError: Brackets must be paired')
    }
    if(!/\s/g.test(str)) {
        str = str.split('').join(' ')
    }
    str = str.replace(/\s\s/g, ' ');
    if ((/\(/g.test(str) ? str.match(/\(/g).length : 0 ) !== (/\)/g.test(str) ? str.match(/\)/g).length : 0 )) {
        return 'error';
    }
    while (/\([\d\w\+\-\*\.\/\s]+\)/g.test(str)) {
        str = str.replace(/\([\d\w\+\-\*\.\/\s]+\)/g, (item) => {
            return calculate(item.slice(1, item.length - 1));
        })
    }
    let result =  +calculate(str);
    if(/Infinity|NaN/g.test(result)) {
        throw new Error('TypeError: Division by zero.')
    }
    return result
}

module.exports = {
    expressionCalculator
}