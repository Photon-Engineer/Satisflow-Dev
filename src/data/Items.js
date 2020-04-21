/* Notes
I should be able to do all my processing with the item objects.
In the dropcontrol, I can create options from an array of item objects by calling data.name at option creation. 
*/

export const CATS = {
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
    constructor(name, category) {
        this.name = name;
        this.category = category;
    }

    isAFluid() {
        return this.category === CATS.LIQUID;
    }
}


export const ITEMS = {
    IronOre: new Item("Iron Ore", CATS.ORE),
    CopperOre: new Item("Copper Ore", CATS.ORE),
    Limestone: new Item("Limestone", CATS.ORE),
    CateriumOre: new Item("Caterium Ore", CATS.ORE),
    Coal: new Item("Coal", CATS.ORE),
    RawQuartz: new Item("Raw Quartz", CATS.ORE),
    Sulfur: new Item("Sulfur", CATS.ORE),
    Bauxite: new Item("Bauxite", CATS.ORE),
    SAM: new Item("S.A.M Ore", CATS.ORE),
    Uranium: new Item("Uranium", CATS.ORE),
    Water: new Item("Water", CATS.LIQUID),
    CrudeOil: new Item("Crude Oil", CATS.LIQUID),
    HeavyOil: new Item("Heavy Oil", CATS.LIQUID),
    Fuel: new Item("Fuel", CATS.LIQUID),
    BioFuel: new Item("Liquid Biofuel", CATS.LIQUID),
    Turbofuel: new Item("Turbofuel", CATS.LIQUID),
    Alumina: new Item("Alumina Solution", CATS.LIQUID),
    SulfuricAcid: new Item("Sulfuric Acid", CATS.LIQUID),
    Concrete: new Item("Concrete", CATS.MATERIAL),
    IronIngot: new Item("Iron Ingot", CATS.MATERIAL),
    CopperIngot: new Item("Copper Ingot", CATS.MATERIAL),
    CateriumIngot: new Item("Caterium Ingot", CATS.MATERIAL),
    SteelIngot: new Item("Steel Ingot", CATS.MATERIAL),
    AluminumIngot: new Item("Alclad Aluminum Ingot", CATS.MATERIAL),
    QuartzCrystal: new Item("Quartz Crystal", CATS.MATERIAL),
    Polymer: new Item("Polymer Resin", CATS.MATERIAL),
    PetroleumCoke: new Item("Petroleum Coke", CATS.MATERIAL),
    AluminumScrap: new Item("Aluminum Scrap", CATS.MATERIAL),
    Silica: new Item("Silica", CATS.MATERIAL),
    BlackPowder: new Item("Black Powder", CATS.MATERIAL),
    Wire: new Item("Wire", CATS.MATERIAL),
    Cable: new Item("Cable", CATS.MATERIAL),
    IronRod: new Item("Iron Rod", CATS.MATERIAL),
    Screw: new Item("Screw", CATS.MATERIAL),
    IronPlate: new Item("Iron Plate", CATS.MATERIAL),
    ReinforcedIronPlate: new Item("Reinforced Iron Plate", CATS.MATERIAL),
    CopperSheet: new Item("Copper Sheet", CATS.MATERIAL),
    AluminumSheet: new Item("Aluminum Sheet", CATS.MATERIAL),
    Plastic: new Item("Plastic", CATS.MATERIAL),
    Rubber: new Item("Rubber", CATS.MATERIAL),
    PackWater: new Item("Packaged Water", CATS.MATERIAL),
    SteelPipe: new Item("Steel Pipe", CATS.MATERIAL),
    SteelBeam: new Item("Steel Beam", CATS.MATERIAL),
    EncasedIndustrialBeam: new Item("Encased Industrial Beam", CATS.MATERIAL),
    CrystalOscillator: new Item("Crystal Oscillator", CATS.COMPONENT),
    Canister: new Item ("Empty Canister", CATS.COMPONENT),
    Fabric: new Item("Fabric", CATS.COMPONENT),
    ModularFrame: new Item("Modular Frame", CATS.COMPONENT),
    HeavyModularFrame: new Item("Heavy Modular Frame", CATS.COMPONENT),
    Rotor: new Item("Rotor", CATS.COMPONENT),
    Stator: new Item("Stator", CATS.COMPONENT),
    Motor: new Item("Motor", CATS.COMPONENT),
    Quickwire: new Item("Quickwire", CATS.COMPONENT),
    Circuit: new Item("Circuit", CATS.COMPONENT),
    Computer: new Item("Computer", CATS.COMPONENT),
    AILimiter: new Item("A.I. Limiter", CATS.COMPONENT),
    HighSpeedConnector: new Item("High-Speed Connector", CATS.COMPONENT),
    Supercomputer: new Item("Supercomputer", CATS.COMPONENT),
    Battery: new Item("Battery", CATS.COMPONENT),
    HeatSink: new Item("Heat Sink", CATS.COMPONENT),
    RadioControlUnit: new Item("Radio Control Unit", CATS.COMPONENT),
    TurboMotor: new Item("Turbo Motor", CATS.COMPONENT),
    ElectromagneticControlRod: new Item("Electromagnetic Control Rod", CATS.COMPONENT),
    UraniumPellet: new Item("Uranium Pellet", CATS.COMPONENT),
    EncasedUraniumCell: new Item("Encased Uranium Cell", CATS.COMPONENT),
    Beacon: new Item("Beacon", CATS.COMPONENT),
    CompactedCoal: new Item("Compacted Coal", CATS.FUEL),
    Leaves: new Item("Leaves", CATS.FUEL),
    Mycelia: new Item("Mycelia", CATS.FUEL),
    Wood: new Item("Wood", CATS.FUEL),
    Biomass: new Item("Biomass", CATS.FUEL),
    PackOil: new Item("Packaged Oil", CATS.FUEL),
    PackHeavyOil: new Item("Pack Heavy Oil Residue", CATS.FUEL),
    SolidBiofuel: new Item("Solid Biofuel", CATS.FUEL),
    PackFuel: new Item("Packaged Fuel", CATS.FUEL),
    PackBiofuel: new Item("Packaged Liquid Biofuel", CATS.FUEL),
    PackTurbofuel: new Item("Packaged Turbofuel", CATS.FUEL),
    NuclearFuelRod: new Item("Nuclear Fuel Rod", CATS.FUEL),
    Nobelisk: new Item("Nobelisk", CATS.AMMO),
    Filter: new Item("Filter", CATS.AMMO),
    ColorCartridge: new Item("Color Cartridge", CATS.AMMO),
    Cartridge: new Item("Cartridge", CATS.AMMO),
    SpikedRebar: new Item("Spiked Rebar", CATS.AMMO),
    IodineInfusedFilter: new Item("Iodine Infused Filter", CATS.AMMO),
    SmartPlating: new Item("Smart Plating", CATS.SPECIAL),
    VersatileFramework: new Item("Versatile Framework", CATS.SPECIAL),
    AutomatedWiring: new Item("Automated Wiring", CATS.SPECIAL),
    ModularEngine: new Item("Modular Engine", CATS.SPECIAL),
    AdaptiveControlUnit: new Item("Adaptive Control Unit", CATS.SPECIAL),
}

class Recipe {
    constructor(name, structure) {
        this.name = name;
        this.structure = structure;
        this.inputs = [];
        this.outputs = [];
        this.matchInput = this.matchInput.bind(this);
        this.calculate = this.calculate.bind(this);
    }
    addInput(item, ppm) {
        this.inputs[this.inputs.length] = [item, ppm];
        return this;
    }
    addOutput(item, ppm) {
        this.outputs[this.outputs.length] = [item, ppm];
        return this;
    }

    matchInput(item, ppm, multiplier) {
        var i = 0;
        var finished = false;
        var prc = 0;
        var position = -1;
        do {
            if (this.inputs[i]!==undefined && item === this.inputs[i][0]) {
                let requiredPpm = this.inputs[i][1] * multiplier;
                let ratio = ppm / requiredPpm;
                prc = ratio > 1 ? 1 : ratio;
                position = i;
                finished = true;
            }
            i++;
            if(i===this.inputs.length){
                finished=true;
            }
        } while (!finished);
        return {
            position: position,
            percent: prc,
        }
    }

    calculate(inputs, multiplier) {
        //console.log(multiplier)
        // inputs should be an array of [item,ppm] arrays for each input
        const RIN = this.inputs.map(inp => inp[0].name);
        const RRP = this.inputs.map(inp => inp[1] * multiplier);
        var AIP = new Array(this.inputs.length).fill(0);
        const ROT = this.outputs.map(out => out[0].name);
        const MOP = this.outputs.map(out => out[1] * multiplier)
        var PRC = new Array(this.inputs.length).fill(0);
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i] != null) {
                let matchObj = this.matchInput(inputs[i][0], inputs[i][1], multiplier);
                AIP[matchObj.position] += inputs[i][1];
                PRC[matchObj.position] += matchObj.percent;
            }
        }
        PRC = PRC.map(p => p > 1 ? 1 : p);
        const AOP = MOP.map(mop=>mop*Math.min(...PRC));

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
    new Recipe("Iron", STRUC.SMLT).addInput(ITEMS.IronOre, 30).addOutput(ITEMS.IronIngot, 30),
    new Recipe("Copper", STRUC.SMLT).addInput(ITEMS.CopperOre, 30).addOutput(ITEMS.CopperIngot, 30),
    new Recipe("Caterium", STRUC.SMLT).addInput(ITEMS.CateriumOre, 45).addOutput(ITEMS.CateriumIngot, 15),
    new Recipe("Alt: Pure Aluminum Ingot",STRUC.SMLT).addInput(ITEMS.AluminumScrap,144).addOutput(ITEMS.AluminumIngot,36),
]

export const FoundryRecipes = [
    new Recipe("Steel", STRUC.FOUN).addInput(ITEMS.IronOre,45).addInput(ITEMS.Coal,45).addOutput(ITEMS.SteelIngot,45),
    new Recipe("Aluminum", STRUC.FOUN).addInput(ITEMS.Bauxite,105).addInput(ITEMS.Silica,90).addOutput(ITEMS.AluminumIngot,30),
    new Recipe("Alt: Iron Alloy", STRUC.FOUN).addInput(ITEMS.IronOre,20).addInput(ITEMS.CopperOre,20).addOutput(ITEMS.IronIngot,50),
    new Recipe("Alt: Coke Steel", STRUC.FOUN).addInput(ITEMS.IronOre,75).addInput(ITEMS.PetroleumCoke,75).addOutput(ITEMS.SteelIngot,100),
    new Recipe("Alt: Compacted Steel", STRUC.FOUN).addInput(ITEMS.IronOre,22.5).addInput(ITEMS.CompactedCoal,11.25).addOutput(ITEMS.SteelIngot,37.5),
    new Recipe("Alt: Solid Steel", STRUC.FOUN).addInput(ITEMS.IronIngot,40).addInput(ITEMS.Coal,40).addOutput(ITEMS.SteelIngot,60),
]

export const ConstructorRecipes = [
	new Recipe("Cable",STRUC.CONS).addInput(ITEMS.Wire,60).addOutput(ITEMS.Cable,30),
	new Recipe("Wire",STRUC.CONS).addInput(ITEMS.CopperIngot,15).addOutput(ITEMS.Wire,30),
	new Recipe("Concrete",STRUC.CONS).addInput(ITEMS.Limestone,45).addOutput(ITEMS.Concrete,15),
	new Recipe("Screw",STRUC.CONS).addInput(ITEMS.IronRod,10).addOutput(ITEMS.Screw,40),
	new Recipe("Biomass (Leaves)",STRUC.CONS).addInput(ITEMS.Leaves,120).addOutput(ITEMS.Biomass,60),
	new Recipe("Biomass (Wood)",STRUC.CONS).addInput(ITEMS.Wood,60).addOutput(ITEMS.Biomass,300),
	new Recipe("Iron Plate",STRUC.CONS).addInput(ITEMS.IronIngot,30).addOutput(ITEMS.IronPlate,20),
	new Recipe("Iron Rod",STRUC.CONS).addInput(ITEMS.IronIngot,15).addOutput(ITEMS.IronRod,15),
	new Recipe("Copper Sheet",STRUC.CONS).addInput(ITEMS.CopperIngot,20).addOutput(ITEMS.CopperSheet,10),
	new Recipe("Quartz Crystal",STRUC.CONS).addInput(ITEMS.RawQuartz,37.5).addOutput(ITEMS.QuartzCrystal,22.5),
	new Recipe("Alt: Steel Rod",STRUC.CONS).addInput(ITEMS.SteelIngot,12).addOutput(ITEMS.IronRod,48),
	new Recipe("Steel Beam",STRUC.CONS).addInput(ITEMS.SteelIngot,60).addOutput(ITEMS.SteelBeam,15),
	new Recipe("Steel Pipe",STRUC.CONS).addInput(ITEMS.SteelIngot,30).addOutput(ITEMS.SteelPipe,20),
	new Recipe("Alt: Charcoal",STRUC.CONS).addInput(ITEMS.Wood,15).addOutput(ITEMS.Coal,150),
	new Recipe("Alt: Biocoal",STRUC.CONS).addInput(ITEMS.Biomass,37.5).addOutput(ITEMS.Coal,45),
	new Recipe("Alt: Casted Screw",STRUC.CONS).addInput(ITEMS.IronIngot,12.5).addOutput(ITEMS.Screw,50),
	new Recipe("Alt: Steel Screw",STRUC.CONS).addInput(ITEMS.SteelBeam,5).addOutput(ITEMS.Screw,260),
	new Recipe("Silica",STRUC.CONS).addInput(ITEMS.RawQuartz,22.5).addOutput(ITEMS.Silica,37.5),
	new Recipe("Alt: Iron Wire",STRUC.CONS).addInput(ITEMS.IronIngot,12.5).addOutput(ITEMS.Wire,22.5),
	new Recipe("Alt: Caterium Wire",STRUC.CONS).addInput(ITEMS.CateriumIngot,15).addOutput(ITEMS.Wire,120),
	new Recipe("Solid Biofuel",STRUC.CONS).addInput(ITEMS.Biomass,120).addOutput(ITEMS.SolidBiofuel,60),
	new Recipe("Empty Canister",STRUC.CONS).addInput(ITEMS.Plastic,30).addOutput(ITEMS.Canister,60),
	//new Recipe("Biomass (Alien Carapace)",STRUC.CONS).addInput(ITEMS.AlienCarapace,15).addOutput(ITEMS.Biomass,1500),
	new Recipe("Spiked Rebar",STRUC.CONS).addInput(ITEMS.IronRod,15).addOutput(ITEMS.SpikedRebar,15),
	//new Recipe("Biomass (Alien Organs)",STRUC.CONS).addInput(ITEMS.AlienOrgans,7.5).addOutput(ITEMS.Biomass,1500),
	new Recipe("Quickwire",STRUC.CONS).addInput(ITEMS.CateriumIngot,12).addOutput(ITEMS.Quickwire,60),
	//new Recipe("Color Cartridge",STRUC.CONS).addInput(ITEMS.FlowerPetals,37.5).addOutput(ITEMS.ColorCartridge,75),
	new Recipe("Biomass (Mycelia)",STRUC.CONS).addInput(ITEMS.Mycelia,150).addOutput(ITEMS.Biomass,150),
	//new Recipe("Power Shard (1)",STRUC.CONS).addInput(ITEMS.GreenPowerSlug,6).addOutput(ITEMS.PowerShard,6),
    //new Recipe("Power Shard (2)",STRUC.CONS).addInput(ITEMS.YellowPowerSlug,4).addOutput(ITEMS.PowerShard,8),
    //new Recipe("Power Shard (5)",STRUC.CONS).addInput(ITEMS.PurplePowerSlug,3).addOutput(ITEMS.PowerShard,15),
]

export const AssemblerRecipes = [
	new Recipe("Reinforced Iron Plate",STRUC.ASSM).addInput(ITEMS.IronPlate,30).addInput(ITEMS.Screw,60).addOutput(ITEMS.ReinforcedIronPlate,5),
	new Recipe("Alt: Adhered Iron Plate",STRUC.ASSM).addInput(ITEMS.IronPlate,11.25).addInput(ITEMS.Rubber,3.75).addOutput(ITEMS.ReinforcedIronPlate,3.75),
	new Recipe("Circuit Board",STRUC.ASSM).addInput(ITEMS.CopperSheet,15).addInput(ITEMS.Plastic,30).addOutput(ITEMS.Circuit,7.5),
	new Recipe("Alt: Bolted Frame",STRUC.ASSM).addInput(ITEMS.ReinforcedIronPlate,7.5).addInput(ITEMS.Screw,140).addOutput(ITEMS.ModularFrame,5),
	new Recipe("Modular Frame",STRUC.ASSM).addInput(ITEMS.ReinforcedIronPlate,3).addInput(ITEMS.IronRod,12).addOutput(ITEMS.ModularFrame,2),
	new Recipe("Rotor",STRUC.ASSM).addInput(ITEMS.IronRod,20).addInput(ITEMS.Screw,100).addOutput(ITEMS.Rotor,4),
	new Recipe("Smart Plating",STRUC.ASSM).addInput(ITEMS.ReinforcedIronPlate,2).addInput(ITEMS.Rotor,2).addOutput(ITEMS.SmartPlating,2),
	new Recipe("Alt: Coated Iron Plate",STRUC.ASSM).addInput(ITEMS.IronIngot,50).addInput(ITEMS.Plastic,10).addOutput(ITEMS.IronPlate,75),
	new Recipe("Alt: Copper Rotor",STRUC.ASSM).addInput(ITEMS.CopperSheet,22.5).addInput(ITEMS.Screw,195).addOutput(ITEMS.Rotor,11.25),
	new Recipe("Alclad Aluminum Sheet",STRUC.ASSM).addInput(ITEMS.AluminumIngot,60).addInput(ITEMS.CopperIngot,22.5).addOutput(ITEMS.AluminumSheet,30),
	new Recipe("Alt: Electrode Circuit Board",STRUC.ASSM).addInput(ITEMS.Rubber,30).addInput(ITEMS.PetroleumCoke,45).addOutput(ITEMS.Circuit,5),
	new Recipe("Alt: Fused Wire",STRUC.ASSM).addInput(ITEMS.CopperIngot,12).addInput(ITEMS.CateriumIngot,3).addOutput(ITEMS.Wire,90),
	new Recipe("Encased Industrial Beam",STRUC.ASSM).addInput(ITEMS.SteelBeam,24).addInput(ITEMS.Concrete,30).addOutput(ITEMS.EncasedIndustrialBeam,6),
	new Recipe("Motor",STRUC.ASSM).addInput(ITEMS.Rotor,10).addInput(ITEMS.Stator,10).addOutput(ITEMS.Motor,5),
	new Recipe("Stator",STRUC.ASSM).addInput(ITEMS.SteelPipe,15).addInput(ITEMS.Wire,40).addOutput(ITEMS.Stator,5),
	new Recipe("Automated Wiring",STRUC.ASSM).addInput(ITEMS.Stator,2.5).addInput(ITEMS.Cable,50).addOutput(ITEMS.AutomatedWiring,2.5),
	new Recipe("A.I. Limiter",STRUC.ASSM).addInput(ITEMS.CopperSheet,25).addInput(ITEMS.Quickwire,100).addOutput(ITEMS.AILimiter,5),
	new Recipe("Fabric",STRUC.ASSM).addInput(ITEMS.Mycelia,15).addInput(ITEMS.Biomass,75).addOutput(ITEMS.Fabric,15),
	new Recipe("Alt: Rubber Concrete",STRUC.ASSM).addInput(ITEMS.Limestone,50).addInput(ITEMS.Rubber,10).addOutput(ITEMS.Concrete,45),
	new Recipe("Alt: Steel Coated Plate",STRUC.ASSM).addInput(ITEMS.SteelIngot,7.5).addInput(ITEMS.Plastic,5).addOutput(ITEMS.IronPlate,45),
	new Recipe("Versatile Framework",STRUC.ASSM).addInput(ITEMS.ModularFrame,2.5).addInput(ITEMS.SteelBeam,30).addOutput(ITEMS.VersatileFramework,5),
	new Recipe("Alt: Compacted Coal",STRUC.ASSM).addInput(ITEMS.Coal,25).addInput(ITEMS.Sulfur,25).addOutput(ITEMS.CompactedCoal,25),
	new Recipe("Alt: Insulated Cable",STRUC.ASSM).addInput(ITEMS.Wire,45).addInput(ITEMS.Rubber,30).addOutput(ITEMS.Cable,100),
	new Recipe("Alt: Quickwire Cable",STRUC.ASSM).addInput(ITEMS.Quickwire,7.5).addInput(ITEMS.Rubber,5).addOutput(ITEMS.Cable,27.5),
	new Recipe("Alt: Silicone Circuit Board",STRUC.ASSM).addInput(ITEMS.CopperSheet,27.5).addInput(ITEMS.Silica,27.5).addOutput(ITEMS.Circuit,12.5),
	new Recipe("Alt: Caterium Circuit Board",STRUC.ASSM).addInput(ITEMS.Plastic,12.5).addInput(ITEMS.Quickwire,37.5).addOutput(ITEMS.Circuit,8.75),
	new Recipe("Alt: Crystal Computer",STRUC.ASSM).addInput(ITEMS.Circuit,7.5).addInput(ITEMS.CrystalOscillator,2.8125).addOutput(ITEMS.Computer,2.8125),
	new Recipe("Alt: Fine Concrete",STRUC.ASSM).addInput(ITEMS.Silica,7.5).addInput(ITEMS.Limestone,30).addOutput(ITEMS.Concrete,25),
	new Recipe("Alt: Electromagnetic Connection Rod",STRUC.ASSM).addInput(ITEMS.Stator,10).addInput(ITEMS.HighSpeedConnector,5).addOutput(ITEMS.ElectromagneticControlRod,10),
	new Recipe("Electromagnetic Control Rod",STRUC.ASSM).addInput(ITEMS.Stator,6).addInput(ITEMS.AILimiter,4).addOutput(ITEMS.ElectromagneticControlRod,4),
	new Recipe("Encased Uranium Cell",STRUC.ASSM).addInput(ITEMS.UraniumPellet,40).addInput(ITEMS.Concrete,9).addOutput(ITEMS.EncasedUraniumCell,10),
	new Recipe("Alt: Fine Black Powder",STRUC.ASSM).addInput(ITEMS.Sulfur,7.5).addInput(ITEMS.CompactedCoal,3.75).addOutput(ITEMS.BlackPowder,15),
	new Recipe("Alt: Heat Exchanger",STRUC.ASSM).addInput(ITEMS.AluminumSheet,37.5).addInput(ITEMS.CopperSheet,56.25).addOutput(ITEMS.HeatSink,13.125),
	new Recipe("Heat Sink",STRUC.ASSM).addInput(ITEMS.AluminumSheet,40).addInput(ITEMS.Rubber,70).addOutput(ITEMS.HeatSink,10),
	new Recipe("Alt: Steeled Frame",STRUC.ASSM).addInput(ITEMS.ReinforcedIronPlate,2).addInput(ITEMS.SteelPipe,10).addOutput(ITEMS.ModularFrame,3),
	new Recipe("Nobelisk",STRUC.ASSM).addInput(ITEMS.BlackPowder,15).addInput(ITEMS.SteelPipe,30).addOutput(ITEMS.Nobelisk,3),
	new Recipe("Alt: Fused Quckwire",STRUC.ASSM).addInput(ITEMS.CateriumIngot,7.5).addInput(ITEMS.CopperIngot,37.5).addOutput(ITEMS.Quickwire,90),
	new Recipe("Alt: Bolted Iron Plate",STRUC.ASSM).addInput(ITEMS.IronPlate,90).addInput(ITEMS.Screw,250).addOutput(ITEMS.ReinforcedIronPlate,15),
	new Recipe("Alt: Stitched Iron Plate",STRUC.ASSM).addInput(ITEMS.IronPlate,18.75).addInput(ITEMS.Wire,37.5).addOutput(ITEMS.ReinforcedIronPlate,5.625),
	new Recipe("Alt: Encased Industrial Pipe",STRUC.ASSM).addInput(ITEMS.SteelPipe,28).addInput(ITEMS.Concrete,20).addOutput(ITEMS.EncasedIndustrialBeam,4),
	new Recipe("Alt: Steel Rotor",STRUC.ASSM).addInput(ITEMS.SteelPipe,10).addInput(ITEMS.Wire,30).addOutput(ITEMS.Rotor,5),
	new Recipe("Alt: Cheap Silica",STRUC.ASSM).addInput(ITEMS.RawQuartz,11.25).addInput(ITEMS.Limestone,18.75).addOutput(ITEMS.Silica,26.25),
    new Recipe("Alt: Quickwire Stator",STRUC.ASSM).addInput(ITEMS.SteelPipe,16).addInput(ITEMS.Quickwire,60).addOutput(ITEMS.Stator,8),
    new Recipe("Black Powder",STRUC.ASSM).addInput(ITEMS.Coal,7.5).addInput(ITEMS.Sulfur,15).addOutput(ITEMS.BlackPowder,7.5),
]

export const ManufacturerRecipes = [
	new Recipe("Alt: Flexible Framework",STRUC.MANU).addInput(ITEMS.ModularFrame,3.75).addInput(ITEMS.SteelBeam,22.5).addInput(ITEMS.Rubber,30).addOutput(ITEMS.VersatileFramework,7.5),
	new Recipe("Alt: Heavy Flexible Frame",STRUC.MANU).addInput(ITEMS.ModularFrame,18.75).addInput(ITEMS.EncasedIndustrialBeam,11.25).addInput(ITEMS.Rubber,75).addInput(ITEMS.Screw,390).addOutput(ITEMS.HeavyModularFrame,3.75),
	new Recipe("Computer",STRUC.MANU).addInput(ITEMS.Circuit,25).addInput(ITEMS.Cable,22.5).addInput(ITEMS.Plastic,45).addInput(ITEMS.Screw,130).addOutput(ITEMS.Computer,2.5),
	new Recipe("Modular Engine",STRUC.MANU).addInput(ITEMS.Motor,2).addInput(ITEMS.Rubber,15).addInput(ITEMS.SmartPlating,2).addOutput(ITEMS.ModularEngine,1),
	new Recipe("Adaptive Control Unit",STRUC.MANU).addInput(ITEMS.AutomatedWiring,7.5).addInput(ITEMS.Circuit,5).addInput(ITEMS.HeavyModularFrame,1).addInput(ITEMS.Computer,1).addOutput(ITEMS.AdaptiveControlUnit,1),
	new Recipe("Alt: Automated Speed Wiring",STRUC.MANU).addInput(ITEMS.Stator,3.75).addInput(ITEMS.Wire,75).addInput(ITEMS.HighSpeedConnector,1.875).addOutput(ITEMS.AutomatedWiring,7.5),
	new Recipe("Heavy Modular Frame",STRUC.MANU).addInput(ITEMS.ModularFrame,10).addInput(ITEMS.SteelPipe,30).addInput(ITEMS.EncasedIndustrialBeam,10).addInput(ITEMS.Screw,200).addOutput(ITEMS.HeavyModularFrame,2),
	new Recipe("Alt: Plastic Smart Plating",STRUC.MANU).addInput(ITEMS.ReinforcedIronPlate,2.5).addInput(ITEMS.Rotor,2.5).addInput(ITEMS.Plastic,7.5).addOutput(ITEMS.SmartPlating,5),
	new Recipe("Alt: Crystal Beacon",STRUC.MANU).addInput(ITEMS.SteelBeam,2).addInput(ITEMS.SteelPipe,8).addInput(ITEMS.CrystalOscillator,0.5).addOutput(ITEMS.Beacon,10),
	new Recipe("Alt: Caterium Computer",STRUC.MANU).addInput(ITEMS.Circuit,26.25).addInput(ITEMS.Quickwire,105).addInput(ITEMS.Rubber,45).addOutput(ITEMS.Computer,3.75),
	new Recipe("Alt: Insulated Crystal Oscillator",STRUC.MANU).addInput(ITEMS.QuartzCrystal,18.75).addInput(ITEMS.Rubber,13.125).addInput(ITEMS.AILimiter,1.875).addOutput(ITEMS.CrystalOscillator,1.875),
	new Recipe("Crystal Oscillator",STRUC.MANU).addInput(ITEMS.QuartzCrystal,18).addInput(ITEMS.Cable,14).addInput(ITEMS.ReinforcedIronPlate,2.5).addOutput(ITEMS.CrystalOscillator,1),
	new Recipe("Nuclear Fuel Rod",STRUC.MANU).addInput(ITEMS.EncasedUraniumCell,10).addInput(ITEMS.EncasedIndustrialBeam,1.2).addInput(ITEMS.ElectromagneticControlRod,2).addOutput(ITEMS.NuclearFuelRod,0.4),
	new Recipe("Battery",STRUC.MANU).addInput(ITEMS.AluminumSheet,15).addInput(ITEMS.Wire,30).addInput(ITEMS.Sulfur,37.5).addInput(ITEMS.Plastic,15).addOutput(ITEMS.Battery,5.625),
	new Recipe("Turbo Motor",STRUC.MANU).addInput(ITEMS.HeatSink,7.5).addInput(ITEMS.RadioControlUnit,3.75).addInput(ITEMS.Motor,7.5).addInput(ITEMS.Rubber,45).addOutput(ITEMS.TurboMotor,1.875),
	new Recipe("Alt: Heavy Encased Frame",STRUC.MANU).addInput(ITEMS.ModularFrame,7.5).addInput(ITEMS.EncasedIndustrialBeam,9.375).addInput(ITEMS.SteelPipe,33.75).addInput(ITEMS.Concrete,20.625).addOutput(ITEMS.HeavyModularFrame,2.8125),
	new Recipe("Alt: Silicone High-Speed Connector",STRUC.MANU).addInput(ITEMS.Quickwire,90).addInput(ITEMS.Silica,37.5).addInput(ITEMS.Circuit,3).addOutput(ITEMS.HighSpeedConnector,3),
	new Recipe("High-Speed Connector",STRUC.MANU).addInput(ITEMS.Quickwire,210).addInput(ITEMS.Cable,37.5).addInput(ITEMS.Circuit,3.75).addOutput(ITEMS.HighSpeedConnector,3.75),
	new Recipe("Alt: Rigour Motor",STRUC.MANU).addInput(ITEMS.Rotor,3.75).addInput(ITEMS.Stator,3.75).addInput(ITEMS.CrystalOscillator,1.25).addOutput(ITEMS.Motor,7.5),
	new Recipe("Alt: Seismic Nobelisk",STRUC.MANU).addInput(ITEMS.BlackPowder,12).addInput(ITEMS.SteelPipe,12).addInput(ITEMS.CrystalOscillator,1.5).addOutput(ITEMS.Nobelisk,6),
	new Recipe("Alt: Nuclear Fuel Unit",STRUC.MANU).addInput(ITEMS.EncasedUraniumCell,10).addInput(ITEMS.ElectromagneticControlRod,2).addInput(ITEMS.CrystalOscillator,0.6).addInput(ITEMS.Beacon,1.2).addOutput(ITEMS.NuclearFuelRod,0.6),
	new Recipe("Alt: Radio Control System",STRUC.MANU).addInput(ITEMS.HeatSink,12.5).addInput(ITEMS.Supercomputer,1.25).addInput(ITEMS.QuartzCrystal,37.5).addOutput(ITEMS.RadioControlUnit,3.75),
	new Recipe("Radio Control Unit",STRUC.MANU).addInput(ITEMS.HeatSink,10).addInput(ITEMS.Rubber,40).addInput(ITEMS.CrystalOscillator,2.5).addInput(ITEMS.Computer,2.5).addOutput(ITEMS.RadioControlUnit,2.5),
	new Recipe("Alt: Turbo Rigour Motor",STRUC.MANU).addInput(ITEMS.Motor,6.5625).addInput(ITEMS.RadioControlUnit,4.6875).addInput(ITEMS.AILimiter,8.4375).addInput(ITEMS.Stator,6.5625).addOutput(ITEMS.TurboMotor,2.8125),
	new Recipe("Alt: Infused Uranium Cell",STRUC.MANU).addInput(ITEMS.UraniumPellet,20).addInput(ITEMS.Sulfur,22.5).addInput(ITEMS.Silica,22.5).addInput(ITEMS.Quickwire,37.5).addOutput(ITEMS.EncasedUraniumCell,17.5),
	new Recipe("Beacon",STRUC.MANU).addInput(ITEMS.IronPlate,22.5).addInput(ITEMS.IronRod,7.5).addInput(ITEMS.Wire,112.5).addInput(ITEMS.Cable,15).addOutput(ITEMS.Beacon,7.5),
	new Recipe("Filter",STRUC.MANU).addInput(ITEMS.Coal,37.5).addInput(ITEMS.Rubber,15).addInput(ITEMS.Fabric,15).addOutput(ITEMS.Filter,7.5),
	new Recipe("Iodine Infused Filter",STRUC.MANU).addInput(ITEMS.Filter,3.75).addInput(ITEMS.Quickwire,30).addInput(ITEMS.Rubber,7.5).addOutput(ITEMS.IodineInfusedFilter,3.75),
    new Recipe("Supercomputer",STRUC.MANU).addInput(ITEMS.Computer,3.75).addInput(ITEMS.AILimiter,3.75).addInput(ITEMS.HighSpeedConnector,5.625).addInput(ITEMS.Plastic,52.5).addOutput(ITEMS.Supercomputer,1.875),
    new Recipe("Cartridge",STRUC.MANU).addInput(ITEMS.Beacon,3).addInput(ITEMS.SteelPipe,30).addInput(ITEMS.BlackPowder,30).addInput(ITEMS.Rubber,30).addOutput(ITEMS.Cartridge,15),
]

export const RefineryRecipes = [
	new Recipe("Fuel",STRUC.REFI).addInput(ITEMS.CrudeOil,60).addOutput(ITEMS.Fuel,40).addOutput(ITEMS.Polymer,30),
	new Recipe("Petroleum Coke",STRUC.REFI).addInput(ITEMS.HeavyOil,40).addOutput(ITEMS.PetroleumCoke,120),
	new Recipe("Plastic",STRUC.REFI).addInput(ITEMS.CrudeOil,30).addOutput(ITEMS.Plastic,20).addOutput(ITEMS.HeavyOil,10),
	new Recipe("Rubber",STRUC.REFI).addInput(ITEMS.CrudeOil,30).addOutput(ITEMS.Rubber,20).addOutput(ITEMS.HeavyOil,20),
	new Recipe("Residual Fuel",STRUC.REFI).addInput(ITEMS.HeavyOil,60).addOutput(ITEMS.Fuel,40),
	new Recipe("Residual Plastic",STRUC.REFI).addInput(ITEMS.Polymer,60).addInput(ITEMS.Water,20).addOutput(ITEMS.Plastic,20),
	new Recipe("Residual Rubber",STRUC.REFI).addInput(ITEMS.Polymer,40).addInput(ITEMS.Water,40).addOutput(ITEMS.Rubber,20),
	new Recipe("Alt: Coated Cable",STRUC.REFI).addInput(ITEMS.Wire,375).addInput(ITEMS.HeavyOil,15).addOutput(ITEMS.Cable,675),
	new Recipe("Alt: Diluted Pack Fuel",STRUC.REFI).addInput(ITEMS.HeavyOil,30).addInput(ITEMS.PackWater,60).addOutput(ITEMS.PackFuel,60),
	new Recipe("Alt: Electrode - Aluminum Scrap",STRUC.REFI).addInput(ITEMS.Alumina,90).addInput(ITEMS.Coal,30).addOutput(ITEMS.AluminumScrap,150).addOutput(ITEMS.Water,30),
	new Recipe("Alumina Solution",STRUC.REFI).addInput(ITEMS.Bauxite,70).addInput(ITEMS.Water,100).addOutput(ITEMS.Alumina,80).addOutput(ITEMS.Silica,20),
	new Recipe("Aluminum Scrap",STRUC.REFI).addInput(ITEMS.Alumina,240).addInput(ITEMS.PetroleumCoke,60).addOutput(ITEMS.AluminumScrap,360).addOutput(ITEMS.Water,60),
	new Recipe("Alt: Heavy Oil Residue",STRUC.REFI).addInput(ITEMS.CrudeOil,30).addOutput(ITEMS.HeavyOil,40).addOutput(ITEMS.Polymer,20),
	new Recipe("Alt: Polyester Fabric",STRUC.REFI).addInput(ITEMS.Polymer,80).addInput(ITEMS.Water,50).addOutput(ITEMS.Fabric,5),
	new Recipe("Alt: Polymer Resin",STRUC.REFI).addInput(ITEMS.CrudeOil,60).addOutput(ITEMS.Polymer,130).addOutput(ITEMS.HeavyOil,20),
	new Recipe("Alt: Pure Caterium Ingot",STRUC.REFI).addInput(ITEMS.CateriumOre,24).addInput(ITEMS.Water,24).addOutput(ITEMS.CateriumIngot,12),
	new Recipe("Alt: Pure Copper Ingot",STRUC.REFI).addInput(ITEMS.CopperOre,15).addInput(ITEMS.Water,10).addOutput(ITEMS.CopperIngot,375),
	new Recipe("Alt: Pure Iron Ingot",STRUC.REFI).addInput(ITEMS.IronOre,35).addInput(ITEMS.Water,20).addOutput(ITEMS.IronIngot,65),
	new Recipe("Alt: Pure Quartz Crystal",STRUC.REFI).addInput(ITEMS.RawQuartz,675).addInput(ITEMS.Water,375).addOutput(ITEMS.QuartzCrystal,525),
	new Recipe("Alt: Recycled Rubber",STRUC.REFI).addInput(ITEMS.Plastic,30).addInput(ITEMS.Fuel,30).addOutput(ITEMS.Rubber,60),
	new Recipe("Alt: Steamed Copper Sheet",STRUC.REFI).addInput(ITEMS.CopperIngot,225).addInput(ITEMS.Water,225).addOutput(ITEMS.CopperSheet,225),
	new Recipe("Alt: Turbo Heavy Fuel",STRUC.REFI).addInput(ITEMS.HeavyOil,375).addInput(ITEMS.CompactedCoal,30).addOutput(ITEMS.Turbofuel,30),
	new Recipe("Pack Turbofuel",STRUC.REFI).addInput(ITEMS.Turbofuel,20).addInput(ITEMS.Canister,20).addOutput(ITEMS.PackTurbofuel,20),
	new Recipe("Unpackage Turbo Fuel",STRUC.REFI).addInput(ITEMS.PackTurbofuel,20).addOutput(ITEMS.Turbofuel,20).addOutput(ITEMS.Canister,20),
	new Recipe("Alt: Wet Concrete",STRUC.REFI).addInput(ITEMS.Limestone,120).addInput(ITEMS.Water,100).addOutput(ITEMS.Concrete,80),
	new Recipe("Sulfuric Acid",STRUC.REFI).addInput(ITEMS.Sulfur,50).addInput(ITEMS.Water,50).addOutput(ITEMS.SulfuricAcid,100),
	new Recipe("Uranium Pellet",STRUC.REFI).addInput(ITEMS.Uranium,50).addInput(ITEMS.SulfuricAcid,80).addOutput(ITEMS.UraniumPellet,50).addOutput(ITEMS.SulfuricAcid,20),
	new Recipe("Alt: Recycled Plastic",STRUC.REFI).addInput(ITEMS.Rubber,30).addInput(ITEMS.Fuel,30).addOutput(ITEMS.Plastic,60),
	new Recipe("Turbofuel",STRUC.REFI).addInput(ITEMS.Fuel,225).addInput(ITEMS.CompactedCoal,15).addOutput(ITEMS.Turbofuel,1.88e+03),
	new Recipe("Unpackage Liquid Biofuel",STRUC.REFI).addInput(ITEMS.PackBiofuel,60).addOutput(ITEMS.Biofuel,60).addOutput(ITEMS.Canister,60),
	new Recipe("Unpackage Fuel",STRUC.REFI).addInput(ITEMS.PackFuel,60).addOutput(ITEMS.Fuel,60).addOutput(ITEMS.Canister,60),
	new Recipe("Unpackage Oil",STRUC.REFI).addInput(ITEMS.PackOil,60).addOutput(ITEMS.CrudeOil,60).addOutput(ITEMS.Canister,60),
	new Recipe("Unpackage Heavy Oil Residue",STRUC.REFI).addInput(ITEMS.PackHeavyOil,20).addOutput(ITEMS.HeavyOil,20).addOutput(ITEMS.Canister,20),
	new Recipe("Unpackage Water",STRUC.REFI).addInput(ITEMS.PackWater,120).addOutput(ITEMS.Water,120).addOutput(ITEMS.Canister,120),
	new Recipe("Pack Fuel",STRUC.REFI).addInput(ITEMS.Fuel,40).addInput(ITEMS.Canister,40).addOutput(ITEMS.PackFuel,40),
	new Recipe("Liquid Biofuel",STRUC.REFI).addInput(ITEMS.SolidBiofuel,90).addInput(ITEMS.Water,45).addOutput(ITEMS.Biofuel,60),
	new Recipe("Pack Liquid Biofuel",STRUC.REFI).addInput(ITEMS.Biofuel,40).addInput(ITEMS.Canister,40).addOutput(ITEMS.PackBiofuel,40),
	new Recipe("Pack Oil",STRUC.REFI).addInput(ITEMS.CrudeOil,30).addInput(ITEMS.Canister,30).addOutput(ITEMS.PackOil,30),
    new Recipe("Pack Heavy Oil Residue",STRUC.REFI).addInput(ITEMS.HeavyOil,30).addInput(ITEMS.Canister,30).addOutput(ITEMS.PackHeavyOil,30),
    new Recipe("Packaged Water",STRUC.REFI).addInput(ITEMS.Water,60).addInput(ITEMS.Canister,60).addOutput(ITEMS.PackWater,60),
]

export const itemObjArray = Object.values(ITEMS); // All the item objects

export function getItemsByCat(category) {
    return itemObjArray.filter(v => v.category === category);
}