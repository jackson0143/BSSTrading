import React, { useState } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard";

function App() {
  const options = [
    "Bee_Cub",
    "Brown_Cub",
    "Doodle_Cub",
    "Gingerbread_Cub",
    "Peppermint_Cub",
    "Robo_Cub",
    "Snow_Cub",
    "Star_Cub",
    "Stick_Cub",
  ];

  const options2 = [
    "Basic_black",
    "Basic_blue",
    "Basic_green",
    "Basic_pink",
    "Basic_red",
    "Basic_white",
    "Wavy_cyan",
    "Wavy_doodle",
    "Wavy_festive",
    "Wavy_purple",
    "Wavy_yellow",
  ];

  const options3 = ["Cub_Buddy_Voucher"];
  const options4 = [
    "cancer_star_sign",
    "capricorn_star_sign",
    "aquarius_star_sign",
    "aries_star_sign",
    "gemini_star_sign",
    "virgo_star_sign",
    "taurus_star_sign",
    "scorpio_star_sign",
    "sagittarius_star_sign",
    "pisces_star_sign",
    "leo_star_sign",
    "libra_star_sign",
    "4-pronged_vector_bee",
    "abstract_color_painting",
    "ant_field_stamp",
    "bamboo_field_stamp",
    "mountain_top_field_stamp",
    "mushroom_field_stamp",
    "pepper_patch_stamp",
    "pineapple_patch_stamp",
    "pine_tree_forest_stamp",
    "spider_field_stamp",
    "strawberry_field_stamp",
    "stump_field_stamp",
    "atom_symbol",
    "auryn",

    "barcode",
    "baseball_swing",
    "bbm_from_below",
    "bear_bee_offer",
    "black_star",
    "black_truffle_mushroom",
    "blob_bumble_bee",
    "blowing_leaf",
    "blue_and_green_marble",
    "blue_flower_field_stamp",
    "blue_square",
    "blue_triangle_critter",
    "bomber_bee_bear",
    "bubble_wand",
    "cactus_field_stamp",
    "chanterelle_mushroom",
    "chef_hat_polar_bear",
    "classic_killroy",
    "clover_field_stamp",
    "coconut_field_stamp",
    "coiled_snake",
    "cordate_leaf",
    "critter_in_a_stocking",
    "cunate_leaf",
    "cyan_decorative_border",
    "cyan_hilted_sword",
    "cyan_star",
    "dandelion_field_stamp",
    "dapper_from_above",
    "dark_flame",
    "desperate_booth",
    "diamond_cluster",
    "diamond_diamond_bee",
    "diamond_trim",
    "eighth_note",
    "elliptic_leaf",
    "festive_pufferfish",
    "flying_bee_bear",
    "flying_festive_bee",
    "flying_magenta_critter",
    "flying_ninja_bee",
    "flying_rad_bee",
    "fly_agaric_mushroom",
    "fork_and_knife",
    "forward_facing_aphid",
    "forward_facing_spider",
    "fuzz_bomb",
    "gamer_chat_icon",
    "giraffe",
    "glowering_gummy_bear",
    "golden_rake",
    "green_circle",
    "green_plus_sign",
    "green_sell",
    "grey_diamond_logo",
    "grey_raining_cloud",
    "grey_shape_companion",
    "gummyballer",
    "honey_dipper",
    "hourglass",
    "ionic_column_top",
    "jack-o-lantern",
    "lanceolate_leaf",
    "launching_rocket",
    "left_facing_ant",
    "left_mythic_gem_fleuron",
    "left_shining_diamond_fleuron",

    "lightning",
    "little_scorpion",
    "lyrate_leaf",
    "menacing_mantis",
    "morel_mushroom",
    "motivating_nectar_icon",

    "mythic_m",
    "nessie",
    "oblique_leaf",
    "orange_green_tri_deco",
    "orange_leg_critter",
    "orange_step_array",
    "orange_swirled_marble",
    "orphan_dog",
    "pale_heart",
    "palm_tree",
    "panicked_science_bear",
    "party_robo_bear",
    "peace_sign_hand",
    "pearl_girl",

    "pink_chair",
    "pink_hive_slot",

    "porcini_mushroom",
    "precise_eye",
    "prehistoric_hand",
    "prismatic_mushroom",
    "prism_painting",
    "pulsar",
    "purple_pointed_critter",
    "pyramid",
    "red_doodle_person",
    "red_palm_hand",
    "red_wailing_cry",
    "refreshing_nectar_icon",
    "reniform_leaf",
    "rhomboid_leaf",
    "rhubarb",
    "right_facing_stump_snail",
    "right_gold_swirl_fleuron",
    "right_shining_diamond_fleuron",
    "robot_head",
    "round_basic_bee",
    "round_green_critter",
    "round_rascal_bee",
    "royal_bear",
    "royal_symbol",
    "rubber_duck",

    "satisfying_nectar_icon",
    "saturn",
    "scissors",
    "scooper",

    "scythe",
    "shiitake_mushroom",
    "shining_halo",
    "shining_star",
    "shocked_hive_slot",
    "shrugging_heart",
    "sideways_spirit_bear",
    "simple_cloud",
    "simple_mountain",
    "simple_skyscraper",
    "sitting_green_shirt_bear",
    "small_blue_chick",
    "small_flame",
    "small_pink_tulip",
    "small_shield",
    "small_tickseed",
    "small_white_daisy",
    "spatulate_leaf",

    "spore_covered_puffshroom",
    "squashed_head_bear",
    "standing_bean_bug",
    "standing_beekeeper",
    "standing_caterpillar",

    "super-scooper",
    "tabby_from_behind",
    "tabby_scratch",
    "tadpole",

    "theatrical_intruder",
    "thumbs_up_hand",
    "tide_popper",
    "tiny_house",
    "tnt",
    "tornado",
    "tough_potato",
    "traffic_light",
    "triple_exclamation",
    "uplooking_bear",
    "vacuum",

    "wall_crack",
    "waving_townsperson",
    "waxing_crescent_moon",
    "white_button_mushroom",
    "white_flag",
    "window",
    "wishbone",
    "wobbly_looker_bee",
    "yellow_left_arrow",
    "yellow_smile",
    "yellow_sticky_hand",
    "yellow_swirled_marble",
    "yellow_umbrella",
    "yellow_walking_wiggly_person",
    "young_elf",
  ];


  const [itemQuantities, setItemQuantities] = useState({
    cubs: {},
    hive: {},
    vouchers: {},
    stickers: {},
  });

  
  const handleAddItem = (item, type) => {
    const currentQuantity = itemQuantities[type][item] || 0;
    const updatedQuantities = {
      ...itemQuantities,
      [type]: {
        ...itemQuantities[type],
        [item]: currentQuantity + 1,
      },
    };
    setItemQuantities(updatedQuantities);
    console.log(getAllItems());
  };

  const handleRemoveItem = (item, type) => {
    const currentQuantity = itemQuantities[type][item] || 0;
    if (currentQuantity > 0) {
      const updatedQuantities = {
        ...itemQuantities,
        [type]: {
          ...itemQuantities[type],
          [item]: currentQuantity - 1,
        },
      };
      setItemQuantities(updatedQuantities);
    }
  };

  const getAllItems = () => {
    const allItems = [];

    Object.keys(itemQuantities.cubs).forEach((item) => {
      allItems.push({ type: "cubs", item, count: itemQuantities.cubs[item] });
    });

    Object.keys(itemQuantities.hive).forEach((item) => {
      allItems.push({ type: "hive", item, count: itemQuantities.hive[item] });
    });

    Object.keys(itemQuantities.vouchers).forEach((item) => {
      allItems.push({
        type: "vouchers",
        item,
        count: itemQuantities.vouchers[item],
      });
    });

    Object.keys(itemQuantities.stickers).forEach((item) => {
      allItems.push({
        type: "stickers",
        item,
        count: itemQuantities.stickers[item],
      });
    });
    return allItems;
  };

  return (
    <div className="grid grid-cols-2 p-14 gap-80">
      <div className="bg-[#3c3c3c] border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col">
          <div className="flex justify-center text-white mb-4">YOUR OFFER</div>

          <div className="flex flex-wrap gap-4 mt-4 bg-[#565656] border rounded-lg ">
  {getAllItems().length === 0 ? (
    <div className = "text-white p-4 text-3xl">No items added to the offer</div>
  ) : (
    getAllItems().map((item) => (
      <ItemCard
        key={`${item.type}-${item.item}`}
        option="display"
        type={item.type}
        title={item.item}
        count={item.count}
        onClick={() => handleRemoveItem(item.item, item.type)}
      />
    ))
  )}
</div>
          {/* Cub skins text + search bar */}
          <div className="flex pt-9 justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cub skins
            </h2>
            <div className="flex items-center w-80 h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#565656]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full bg-[#565656] outline-none text-sm text-white-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
              />
            </div>
          </div>

          {/* Display Cub skins */}
          <div className="flex flex-wrap gap-4 mt-4">
            {options.map((item) => (
              <ItemCard
                key={item}
                option="button"
                type="cubs"
                title={item}
                onClick={() => handleAddItem(item, "cubs")}
              />
            ))}
          </div>

          {/* Display Hive skins */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {options2.map((item) => (
              <ItemCard
                key={item}
                option="button"
                type="hive"
                title={item}
                onClick={() => handleAddItem(item, "hive")}
              />
            ))}
          </div>

          {/* Display Vouchers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Vouchers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {options3.map((item) => (
              <ItemCard
                key={item}
                option="button"
                type="vouchers"
                title={item}
                onClick={() => handleAddItem(item, "vouchers")}
              />
            ))}
          </div>

          {/* Display Stickers */}
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Stickers
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {options4.map((item) => (
              <ItemCard
                key={item}
                option="button"
                type="stickers"
                title={item}
                onClick={() => handleAddItem(item, "stickers")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#3c3c3c] border rounded-lg shadow-md border-gray-800 p-4">
        <div className="flex flex-col">
          <div className="flex justify-center text-white mb-4">LOOKING FOR</div>
    
          <div className="flex pt-9 justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cub skins
            </h2>
            <div className="flex items-center w-80 h-12 rounded-lg focus-within:shadow-lg bg-[#565656] overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300 bg-[#565656]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full bg-[#565656] outline-none text-sm text-white-700 pr-2"
                type="text"
                id="search"
                placeholder="Search something.."
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {options.map((item) => (
              <ItemCard option="button" type="cubs" title={item} />
            ))}
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl pt-9">
            Hive skins
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {options2.map((item) => (
              <ItemCard option="button" type="hive" title={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
