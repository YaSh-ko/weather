export const likedCities = {
    list: new Set(),
    init() {
        const saved = JSON.parse(localStorage.getItem('likedCities')) || []; 
        this.list = new Set(saved);
        return this;
    },
    addCity(city) {
        this.list.add(city);
        this.save();
    },
    deleteCity(city) {
        this.list.delete(city);
        this.save();
    },
    save() {
        localStorage.setItem('likedCities', JSON.stringify([...this.list]));
    }

}