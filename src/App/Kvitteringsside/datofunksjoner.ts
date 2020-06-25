export const finnMaaned = (month: number): string => {
    switch (month) {
        case 0:
            return 'januar';
        case 1:
            return 'februar';
        case 2:
            return 'mars';
        case 3:
            return 'april';
        case 4:
            return 'mai';
        case 5:
            return 'juni';
        case 6:
            return 'juli';
        case 7:
            return 'august';
        case 8:
            return 'september';
        case 9:
            return 'oktober';
        case 10:
            return 'november';
        case 11:
            return 'desember';
    }
    return (month + 1).toString();
};

export const dato = (date?: string) => {
    const dato = date ? new Date(date) : new Date();
    return dato.getDate() + '. ' + finnMaaned(dato.getMonth()) + ' ' + dato.getFullYear();
};
