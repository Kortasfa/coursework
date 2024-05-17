export type Phenomenon = {
    name: string;
    inputQuantities: number[];
    outputQuantities: number;
};

export function findPhenomenaData(name: string): Phenomenon | null {
    for (const connection of phenomena) {
        if (connection.name === name) {
            return {
                name: connection.name,
                inputQuantities: connection.inputQuantities,
                outputQuantities: connection.outputQuantities
            };
        }
    }
    return null;
}

export const phenomena: Phenomenon[] = [
    { name: "Эмиссия горячих электронов из полупроводников", inputQuantities: [18], outputQuantities: 10 },
    { name: "Радиационно-электромагнитный четный эффект", inputQuantities: [8, 10], outputQuantities: 18 },
    { name: "Барьерный радиационно-вольтаический эффект", inputQuantities: [10], outputQuantities: 18 },
    { name: "Радиационно-электромагнитный нечетный эффект", inputQuantities: [8, 10], outputQuantities: 18 },
    { name: "Хемомагнитный эффект", inputQuantities: [8, 15], outputQuantities: 18 },
    { name: "Фотопъезоэлектрический эффект", inputQuantities: [17, 4], outputQuantities: 18 },
    { name: "Сила Ампера", inputQuantities: [8, 19], outputQuantities: 11 },
    { name: "Пьезоэлектрический эффект (прямой)", inputQuantities: [4], outputQuantities: 16 },
    { name: "Электрофорез", inputQuantities: [18], outputQuantities: 3 },
    { name: "Джозефсона эффект стационарный", inputQuantities: [19], outputQuantities: 18 },
    { name: "Керра эффект (квадратичный электрооптический)", inputQuantities: [18, 17], outputQuantities: 18 },
    { name: "Автоэлектронная эмиссия", inputQuantities: [18], outputQuantities: 10 },
    { name: "Электроосмос (электрокинетический эффект)", inputQuantities: [18], outputQuantities: 3 },
    { name: "Давление света", inputQuantities: [17], outputQuantities: 2 },
    { name: "Свойство деформации твердых тел", inputQuantities: [4], outputQuantities: 9 },
    { name: "Электролюминесценция инжекционная", inputQuantities: [18], outputQuantities: 17 },
    { name: "Ионизация газа рентгеновскими лучами", inputQuantities: [17], outputQuantities: 16 },
    { name: "Звуколюминесценция", inputQuantities: [5], outputQuantities: 17 },
    { name: "Терморезистивный эффект в полупроводниках", inputQuantities: [12], outputQuantities: 44 },
    { name: "Акустическая эмиссия при деформации", inputQuantities: [4], outputQuantities: 5 },
    { name: "Джоуля-Томсона дифференциальный эффект (дроссель-эффект)", inputQuantities: [2, 3], outputQuantities: 12 },
    { name: "Двойное лучепреломление в потоке коллоид.раст.(эф.Максвелла)", inputQuantities: [17, 3], outputQuantities: 17 },
    { name: "Индукция в движущемся проводнике", inputQuantities: [8, 3], outputQuantities: 18 },
    { name: "Объeмное тепловое расширение твeрдых тел", inputQuantities: [12], outputQuantities: 4 },
    { name: "Видемана эффект (магнитострикция угловая)", inputQuantities: [8, 8], outputQuantities: 4 },
    { name: "Электро-магнитная индукция (закон Фарадея)", inputQuantities: [8], outputQuantities: 18 },
    { name: "Горение", inputQuantities: [12], outputQuantities: 15 },
    { name: "Пельтье эффект", inputQuantities: [19], outputQuantities: 13 },
    { name: "Акустомагнетоэлектрический эффект (открытие 133)", inputQuantities: [5, 8], outputQuantities: 18 },
    { name: "Холла эффект", inputQuantities: [8, 19], outputQuantities: 18 },
    { name: "Магнитострикция линейная", inputQuantities: [8], outputQuantities: 4 },
    { name: "Оптико-акустический эффект", inputQuantities: [17], outputQuantities: 2 },
    { name: "Влияние гидростат. давления сжатия на пластичность металлов", inputQuantities: [2], outputQuantities: 4 },
    { name: "Тепловое действие ультразвука", inputQuantities: [5], outputQuantities: 12 },
    { name: "Соноэлектролюминесценция", inputQuantities: [5, 18], outputQuantities: 17 },
    { name: "Хемилюминесценция", inputQuantities: [15], outputQuantities: 17 },
    { name: "Термоэлектрический эффект в SNS-переходе", inputQuantities: [12, 19], outputQuantities: 18 },
    { name: "Механический эффект Баркгаузена в сегнетоэлектриках", inputQuantities: [33], outputQuantities: 16 },
    { name: "Фотодеформационный эффект", inputQuantities: [17], outputQuantities: 4 },
    { name: "Светогидравлический эффект", inputQuantities: [17], outputQuantities: 2 },
    { name: "Фотомагнитный эффект в р-n-переходе", inputQuantities: [8, 17], outputQuantities: 18 },
    { name: "Силовое действие давления", inputQuantities: [2], outputQuantities: 11 },
    { name: "Влияние облучения нейтронами на темп-ру хрупкости металлов", inputQuantities: [10], outputQuantities: 12 },
    { name: "Хладноломкость металлов и сплавов", inputQuantities: [4, 12], outputQuantities: 4 },
    { name: "Фототермический эффект", inputQuantities: [17, 12], outputQuantities: 12 },
    { name: "Сверхпроводимость слоистых соединений", inputQuantities: [12], outputQuantities: 44 },
    { name: "Баро - эдс", inputQuantities: [2], outputQuantities: 18 },
    { name: "Пленочное охлаждение", inputQuantities: [3, 12], outputQuantities: 12 },
    { name: "Поверхностная ионизация в электрическом поле", inputQuantities: [12, 18], outputQuantities: 10 }
];
