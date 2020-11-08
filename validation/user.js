import isEmpty from "./isEmpty";


const validateImageUpload = (data) => {
    const errors = {}

    if (Buffer.byteLength(data.image)>1000000) {
        errors.image = 'Image can\'t be larger than 1mb';
    }

    //Will be valid if the errors are empty
    const isValid = isEmpty(errors);
    return { isValid, errors }
}

export { validateImageUpload }