// abcd1234 :
let users = [
    {
        id: '1',
        username: 'melon',
        password: '$2b$10$jJVrjq08qZMMiXcpWcvL7.VKzOLPtpWfrY5xuygxmvDUIVfuvgp9u',
        name: '이메론',
        email: 'melon@melon.com',
        url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU'
    },
]

// 아이디 찾아오는 함수
export async function findByUsername(username){

    return users.find((user)=> user.username === username);
    
}

// 데이터를 만들어주는 함수
export async function createUser(user){

    const created = {...user, id: Date.now().toString()};
    users.push(created);

    return created.id;
}

export async function findById(id){
    return users.find((user) => user.id === id);
}