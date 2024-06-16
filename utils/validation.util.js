

export const validateString = (value) =>{
    return value && typeof value === 'string'
}

export const validateNumber = (value) =>{
    return value && !isNaN(value) 
}

export const validateArray = (value) =>{
    return Array.isArray(value);
}   

export const validateBoolean = (value) =>{
    return  typeof value === 'boolean'
} 

