export const attributeFormHandler = (event) => {
    event.preventDefault();

    const productForm = Array.from(event.target);

    return productForm.filter((input) => input.checked).map((attribute) => {
        if (attribute.value === 'Yes'){
            return attribute.name
        }
        if (attribute.value === 'No') {
            return null}
        else {
            return attribute.value
        }
    });
}