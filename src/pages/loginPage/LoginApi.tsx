export const loginApi = (username: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin" && password === "admin") {
                resolve("fake-token-123"); // любой токен
            } else {
                reject(new Error("Неверный логин или пароль"));
            }
        }, 2000);
    });
};
