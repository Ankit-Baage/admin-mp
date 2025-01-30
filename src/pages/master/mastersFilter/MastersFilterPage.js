import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";

import {
  selectBrandList,
  useGetBrandListQuery,
} from "../../../services/brandApiSlice";
import {
  selectModelList,
  useGetModelListQuery,
} from "../../../services/modelApiSlice";
import classes from "./mastersFilterPage.module.css";
import { CustomSelect } from "../../../component/customSelect/CustomSelect";
import {
  selectMastersCategoryFilterState,
  setFilters,
} from "../../../store/mastersCategoryFilterSlice";
import {
  selectPartNameList,
  useGetPartNameListQuery,
} from "../../../services/partNameApiSlice";
import {
  onOpen,
} from "../../../store/variantModalSlice";
import { setVariantFilters } from "../../../store/mastersVariantFilterSlice";

export const MastersFiltersPage = () => {
  const [appliedFilters, setAppliedFilters] = useState({
    identifier: null,
    brand: null,
    model: null,
    part_name: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const masterCategoryState = useSelector(selectMastersCategoryFilterState);

  const { isSuccess } = useGetBrandListQuery(
    { category: masterCategoryState.category },
    { skip: !masterCategoryState.category }
  );
  const brandList = useSelector(selectBrandList);

  const { isSuccess: isModelSuccess } = useGetModelListQuery(
    { category: masterCategoryState.category },
    { skip: !masterCategoryState.category }
  );
  const modelList = useSelector(selectModelList);

  const { isSuccess: isPartNameSuccess } = useGetPartNameListQuery(
    { category: masterCategoryState.category },
    { skip: masterCategoryState.category !== "spares" }
  );
  const partNameList = useSelector(selectPartNameList);

  const handleSelection = (identifier, option) => {
    const updatedFilters = {
      ...appliedFilters,
      [identifier === "brand"
        ? "brand"
        : identifier === "model"
        ? "model"
        : "part_name"]: option === "" ? null : option,
    };

    setAppliedFilters(updatedFilters);
  };
  const handleAdd = () => {
    dispatch(setVariantFilters({ category: masterCategoryState.category }));
    dispatch(
      onOpen({
        action: "Add",
        brand: null,
        model: null,
        ram: null,
        rom: null,
        color: null,
        part_name: null,
        price: null,
        original_price: null,
      })
    );
  };

  useEffect(() => {
    const brandParam = searchParams.get("brand");
    const modelParam = searchParams.get("model");
    const part_nameParam = searchParams.get("part_name");
    const newFilters = {
      brand: brandParam || null,
      model: modelParam || null,
      part_name: part_nameParam || null,
    };
    setAppliedFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    dispatch(setFilters(newFilters));
  }, [dispatch, searchParams]);

  const handleApply = () => {
    const { brand, model, part_name } = appliedFilters;

    if (brand) {
      searchParams.set("brand", brand);
    } else {
      searchParams.delete("brand");
    }

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }
    if (part_name) {
      searchParams.set("part_name", part_name);
    } else {
      searchParams.delete("part_name");
    }

    setSearchParams(searchParams);
    dispatch(setFilters(appliedFilters));
  };

  const selects = [
    {
      label: "brand",
      optionData: brandList,
      selectedId: masterCategoryState.brand || "",
      onSelection: (identifier, option) => {
        handleSelection(identifier, option);
      },
    },
    {
      label: "model",
      selectedId: masterCategoryState.model || "",
      optionData: modelList,
      onSelection: (identifier, option) => {
        handleSelection(identifier, option);
      },
    },
    {
      label: "part name",
      selectedId: masterCategoryState.part_name || "",
      optionData: partNameList,
      onSelection: (identifier, option) => {
        handleSelection(identifier, option);
      },
    },
  ];
  const getFilteredInputs = () => {
    const filteredInputs = selects.filter((input) => {
      if (masterCategoryState.category === "spares") {
        return true; // Show all inputs for "spares" category
      } else {
        return input.label !== "part name";
      }
    });
    return filteredInputs;
  };

  const filteredInputs = getFilteredInputs();

  return (
    <div className={classes.box}>
      {filteredInputs.map((input) => (
        <CustomSelect
          key={input.label}
          options={input.optionData}
          label={input.label}
          onSelection={input.onSelection}
          selectedId={input.selectedId}
        />
      ))}
      <button className={classes.box__btn} onClick={handleApply}>
        Apply
      </button>
      <button className={classes.box__btn__add} onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};
