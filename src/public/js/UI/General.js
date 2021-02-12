import GeneralService from '../Services/General'

const searchCategoriesAndTasks = () => {}


const listenerSearchCategoriesAndTasks = () => {
    const formSearch = document.getElementById('form-search')
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault()

        const txtSearch = document.getElementById('txt-search')

        console.log(txtSearch.value)
    })
};
// -----------------------------------------------------------------



listenerSearchCategoriesAndTasks()