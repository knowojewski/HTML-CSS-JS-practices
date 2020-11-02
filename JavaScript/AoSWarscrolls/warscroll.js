class Warscroll {
    constructor(allegiance, name, mount, move, save, wounds, bravery) {
        this.allegiance = allegiance;
        this.name = name;
        this.mount = mount;
        this.move = move;
        this.save = save;
        this.wounds = wounds;
        this.bravery = bravery;
        this.weapons = [];
        this.abilities = [];
        this.keywords = [];
    }

    addWeapon(weapon) {
        this.weapons.push(weapon);
    }

    addAbility(ability) {
        this.abilities.push(ability);
    }

    addKeyword(keyword) {
        this.keywords.push(keyword);
    }
}

class Weapon {
    constructor(name, type, range, attack, hit, wound, rend, damage) {
        this.name = name;
        this.type = type;
        this.range = range;
        this.attack = attack;
        this.hit = hit;
        this.wound = wound;
        this.rend = rend;
        this.damage = damage;
    }
}

class Ability {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class Keyword {
    constructor(name) {
        this.name = name;
    }
}