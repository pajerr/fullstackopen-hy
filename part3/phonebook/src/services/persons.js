import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const update = (updatedPerson) => {
    const request = axios.put(`${baseUrl}/${updatedPerson.id}`, {
        name: updatedPerson.name,
        number: updatedPerson.number,
        id: updatedPerson.id
    })
    //return only the updated number, ID stays the same
    return request.then((response) => response.data)
}

// const update = (id, updatedNumber) => {
//     const request = axios.put(`${baseUrl}/${id}`, { number: updatedNumber })
//     //return only the updated number, ID stays the same
//     return request.then((response) => response.data.number)
// }

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
