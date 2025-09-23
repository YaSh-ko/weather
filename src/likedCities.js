export const likedCities = {
    list: [],
    init() {
        this.list = JSON.parse(localStorage.getItem('likedCities')) || [];
        return this;
    },
    addCity(city) {
        this.list.push(city);
        this.save();
    },
    deleteCity(city) {
        this.list = this.list.filter(elem => elem !== city);
        this.save();
    },
    save() {
        localStorage.setItem('likedCities', JSON.stringify(this.list));
    }

}