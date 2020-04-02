/* Notes
I should be able to do all my processing with the item objects.
In the dropcontrol, I can create options from an array of item objects by calling data.name at option creation. 
*/



const CATS = {
    ORE: "ore",
    LIQUID: "liquid",
    MATERIAL: "material",
    COMPONENT: "component",
    FUEL: "fuel",
    AMMO: "ammo",
    SPECIAL: "special",
};

const STRUC = {
    MINR: "Miner",
    SMLT: "Smelter",
    CONS: "Constructor",
    ASSM: "Assembler",
    MANU: "Manufacturer",
    REFI: "Refinery",
    FOUN: "Foundry",
}

class Item {
    constructor(name,category){
        this.name = name;
        this.category = category;
    }

    isAFluid() {
        return this.category === CATS.LIQUID;
    }   
}


export const ITEMS = {
    IronOre: new Item("Iron Ore",CATS.ORE),
    CopperOre: new Item("Copper Ore",CATS.ORE),
    Limestone: new Item("Limestone",CATS.ORE),
    CaterniumOre: new Item("Caternium Ore",CATS.ORE),
    Coal: new Item("Coal",CATS.ORE),
    RawQuartz: new Item("Raw Quartz",CATS.ORE),
    Sulfur: new Item("Sulfur",CATS.ORE),
    Bauxite: new Item("Bauxite",CATS.ORE),
    SAM: new Item("S.A.M Ore",CATS.ORE),
    Uranium: new Item("Uranium",CATS.ORE),
    Water: new Item("Water",CATS.LIQUID),
    CrudeOil: new Item("Crude Oil",CATS.LIQUID),
    HeavyOil: new Item("Heavy Oil",CATS.LIQUID),
    Fuel: new Item("Fuel",CATS.LIQUID),
    BioFuel: new Item("Liquid Biofuel",CATS.LIQUID),
    Turbofuel: new Item("Turbofuel",CATS.LIQUID),
    Alumina: new Item("Alumina Solution",CATS.LIQUID),
    SulfuricAcid: new Item("Sulfuric Acid",CATS.LIQUID),
    Concrete: new Item("Concrete",CATS.MATERIAL),
    IronIngot: new Item("Iron Ingot",CATS.MATERIAL),
    CopperIngot: new Item("Copper Ingot",CATS.MATERIAL),
    CaterniumIngot: new Item("Caternium Ingot",CATS.MATERIAL),
    SteelIngot: new Item("Steel Ingot",CATS.MATERIAL),
    AluminumIngot: new Item("Alclad Aluminum Ingor",CATS.MATERIAL),
    Quartz: new Item("Quartz Crystal",CATS.MATERIAL),
    Polymer: new Item("Polymer Resin",CATS.MATERIAL),
    PetroleumCoke: new Item("Petroleum Coke",CATS.MATERIAL),
    AluminumScrap: new Item("Aluminum Scrap",CATS.MATERIAL),
    Silica: new Item("Silica",CATS.MATERIAL),
    BlackPowder: new Item("Black Powder",CATS.MATERIAL),
    Wire: new Item("Wire",CATS.MATERIAL),
    Cable: new Item("Cable",CATS.MATERIAL),
    IronRod: new Item("Iron Rod",CATS.MATERIAL),
    Screw: new Item("Screw",CATS.MATERIAL),
    IronPlate: new Item("Iron Plate",CATS.MATERIAL),
    ReinforcedIronPlate: new Item("Reinforced Iron Plate",CATS.MATERIAL),
    CopperSheet: new Item("Copper Sheet",CATS.MATERIAL),
    AluminumSheet: new Item("Aluminum Sheet",CATS.MATERIAL),
    Plastic: new Item("Plastic",CATS.MATERIAL),
    Rubber: new Item("Rubber",CATS.MATERIAL),
    PackWater: new Item("Packaged Water",CATS.MATERIAL),
    SteelPipe: new Item("Steel Pipe",CATS.MATERIAL),
    SteelBeam: new Item("Steel Beam",CATS.MATERIAL),
    EncasedIndustrialBeam: new Item("Encased Industrial Beam",CATS.MATERIAL),
    Oscillator: new Item("Crystal Oscillator",CATS.COMPONENT),
    Canister: new Item("Empty Canister",CATS.COMPONENT),
    Fabric: new Item("Fabric",CATS.COMPONENT),
    ModularFrame: new Item("Modular Frame",CATS.COMPONENT),
    HeavyModFrame: new Item("Heavy Modular Frame",CATS.COMPONENT),
    Rotor: new Item("Rotor",CATS.COMPONENT),
    Stator: new Item("Stator",CATS.COMPONENT),
    Motor: new Item("Motor",CATS.COMPONENT),
    Quickwire: new Item("Quickwire",CATS.COMPONENT),
    Circuit: new Item("Circuit",CATS.COMPONENT),
    Computer: new Item("Computer",CATS.COMPONENT),
    AILimiter: new Item("A.I. Limiter",CATS.COMPONENT),
    HighSpeedConn: new Item("High-Speed Connector",CATS.COMPONENT),
    Supercomputer: new Item("Supercomputer",CATS.COMPONENT),
    Battery: new Item("Battery",CATS.COMPONENT),
    HeatSink: new Item("Heat Sink",CATS.COMPONENT),
    RadioControl: new Item("Radio Control Unit",CATS.COMPONENT),
    TurboMotor: new Item("Turbo Motor",CATS.COMPONENT),
    ElectromagneticRod: new Item("Electromagnetic Control Rod",CATS.COMPONENT),
    UraniumPellet: new Item("Uranium Pellet",CATS.COMPONENT),
    UraniumCell: new Item("Encased Uranium Cell",CATS.COMPONENT),
    Beacon: new Item("Beacon",CATS.COMPONENT),
    CompactedCoal: new Item("Compacted Coal",CATS.FUEL),
    Leaves: new Item("Leaves",CATS.FUEL),
    Mycelia: new Item("Mycelia",CATS.FUEL),
    Wood: new Item("Wood",CATS.FUEL),
    Biomass: new Item("Biomass",CATS.FUEL),
    PackOil: new Item("Packaged Oil",CATS.FUEL),
    PackHeavyOil: new Item("Packaged Heavy Oil Residue",CATS.FUEL),
    SolidBiofuel: new Item("Solid Biofuel",CATS.FUEL),
    PackFuel: new Item("Packaged Fuel",CATS.FUEL),
    PackBiofuel: new Item("Packaged Liquid Biofuel",CATS.FUEL),
    PackTurbofuel: new Item("Packaged Turbofuel",CATS.FUEL),
    NuclearFuel: new Item("Nuclear Fuel Rod",CATS.FUEL),
    Nobelisk: new Item("Nobelisk",CATS.AMMO),
    Filter: new Item("Filter",CATS.AMMO),
    ColorCartridge: new Item("Color Cartridge",CATS.AMMO),
    Cartridge: new Item("Cartridge",CATS.AMMO),
    Rebar: new Item("Spiked Rebar",CATS.AMMO),
    IodineFilter: new Item("Iodine Infused Filter",CATS.AMMO),
    SmartPlating:new Item("Smart Plating",CATS.SPECIAL),
    VersatileFramework:new Item("Versatile Framework",CATS.SPECIAL),
    AutomatedWiring:new Item("Automated Wiring",CATS.SPECIAL),
    ModularEngine:new Item("Modular Engine",CATS.SPECIAL),
    AdaptiveControl:new Item("Adaptive Control Unit",CATS.SPECIAL),
}

class Recipe {
    constructor(name,structure){
        this.name = name;
        this.structure = structure;
        this.inputs = [];
        this.outputs = [];
    }
    addInput(item,ppm){
        this.inputs[this.inputs.length] = [item,ppm];
    }
    addOutput(item,ppm){
        this.outputs[this.outputs.length] = [item,ppm];
    }

    matchInput(item,ppm,multiplier){
        var i=0;
        var finished = false;
        var prc = 0;
        var position = -1;
        do{
            if(item===this.inputs[i][0]){
                let requiredPpm = this.inputs[i][1]*multiplier;
                let ratio = requiredPpm/ppm;
                prc = ratio > 1 ? 1 : ratio;
                position = i;
                finished = true;
            }
            i++;
        }while(!finished || i!=this.inputs.length-1);
        return {
            position: position,
            percent: prc,
        }
    }

    calculate(inputs,multiplier){
        // inputs should be an array of [item,ppm] arrays for each input
        const RIN = this.inputs.map(inp => inp[0].name);
        const RRP = this.inputs.map(inp => inp[1]*multiplier);
        var AIP = new Array(this.inputs.length).fill(0);
        const ROT = this.outputs.map(out => out[0].name);
        const MOP = this.outputs.map(out => out[1]*multiplier)
        var AOP = new Array(this.outputs.length).fill(0);
        var PRC = new Array(this.inputs.length).fill(0);

        for(var i=0;i<inputs.length,i++){
            matchObj = this.matchInput(inputs[i][0],inputs[i][1],multiplier);
            AIP[matchObj.position] += inputs[i][1];
            PRC[matchObj.position] += matchObj.percent;
        }
        PRC = PRC.map(p=>p>1?1:p);
        AOP = MOP * Math.min(PRC);

        return {
            recipeInputs: RIN,
            recipeReqPpm: RRP,
            actualInpPpm: AIP,
            recipeOutput: ROT,
            maxOutputPpm: MOP,
            actualOutPpm: AOP,
        }
    }
}

export const SmelterRecipes = [
    new Recipe("Iron",STRUC.SMLT).addInput(ITEMS.IronOre,30).addOutput(ITEMS.IronIngot,30),
    new Recipe("Copper",STRUC.SMLT).addInput(ITEMS.CopperOre,30).addOutput(ITEMS.CopperIngot,30),
    new Recipe("Caternium",STRUC.SMLT).addInput(ITEMS.CaterniumOre,45).addOutput(ITEMS.CaterniumIngot,15),
]

export const ConstructorRecipes = [
    new Recipe("Iron Plate",STRUC.CONS).addInput(ITEMS.IronIngot,30).addOutput(ITEMS.IronPlate,20),
    new Recipe("Iron Rod",STRUC.CONS).addInput(ITEMS.IronIngot,15).addOutput(ITEMS.IronRod,15),
    new Recipe("Wire",STRUC.CONS).addInput(ITEMS.CopperIngot,15).addOutput(ITEMS.Wire,30),
    new Recipe("Biomass (Leaves)",STRUC.CONS).addInput(ITEMS.Leaves,120).addOutput(ITEMS.Biomass,60),
    new Recipe("Concrete",STRUC.CONS).addInput(ITEMS.Limestone,45).addOutput(ITEMS.Concrete,15),
    new Recipe("Screw",STRUC.CONS).addInput(ITEMS.IronRod,10).addOutput(ITEMS.Screw,40),
    new Recipe("Biomass (Wood)",STRUC.CONS).addInput(ITEMS.Wood,60).addOutput(ITEMS.Biomass,300),
    new Recipe("Solid Biofuel",STRUC.CONS).addInput(ITEMS.Biomass,120).addOutput(ITEMS.SolidBiofuel,60),
    new Recipe("Steel Beam",STRUC.CONS).addInput(ITEMS.SteelIngot,60).addOutput(ITEMS.SteelBeam,15),
    new Recipe("Steel Pipe",STRUC.CONS).addInput(ITEMS.SteelIngot,30).addOutput(ITEMS.SteelPipe,20),
    new Recipe("Biomass (Mycelia)",STRUC.CONS).addInput(ITEMS.Mycelia,150).addOutput(ITEMS.Biomass,150),
    new Recipe("Spiked Rebar",STRUC.CONS).addInput(ITEMS.IronRod,15).addOutput(ITEMS.Rebar,15),
    //new Recipe("Biomass (Alien)",STRUC.CONS).addInput(ITEMS.Alien)
    new Recipe("Quickwire",STRUC.CONS).addInput(ITEMS.CaterniumIngot,12).addOutput(ITEMS.Quickwire,60),
    new Recipe("Silica",STRUC.CONS).addInput(ITEMS.RawQuartz,22.5).addOutput(ITEMS.Silica,37.5),
    new Recipe("Quartz Crystal",STRUC.CONS).addInput(ITEMS.RawQuartz,37.5).addOutput(ITEMS.Quartz,22.5),
    new Recipe("Alt: Casted Screw",STRUC.CONS).addInput(ITEMS.IronIngot,12.5).addOutput(ITEMS.Screw,50),
    new Recipe("Alt: Steel Screw",STRUC.CONS).addInput(ITEMS.SteelBeam,5).addOutput(ITEMS.Screw,260),
    new Recipe("Alt: Iron Wire",STRUC.CONS).addInput(ITEMS.IronIngot,12.5).addOutput(ITEMS.Wire,22.5),
    new Recipe("Alt: Caternium Wire",STRUC.CONS).addInput(ITEMS.CaterniumIngot,15).addOutput(ITEMS.Wire,120),
]



export const itemNameArray = Object.values(ITEMS);