import { TriangleSideLengths, ValidateTriangleSidesResponse } from "../types";

const validateTriangleSides = ({
  sideA,
  sideB,
  sideC,
}: TriangleSideLengths): ValidateTriangleSidesResponse => {
  let response = {
    isValid: true,
    errorMessage: "",
    noEmptyFields: true,
  };
  if (!sideA.length || !sideB.length || !sideC.length) {
    response.isValid = false;
    response.noEmptyFields = false;
    return response;
  }
  const sideA_num = parseFloat(sideA);
  const sideB_num = parseFloat(sideB);
  const sideC_num = parseFloat(sideC);
  const errorMessages = {
    sideAandBError: `The sum of Side A and Side B must be greater than Side C (${sideA_num} + ${sideB_num} <= ${sideC_num})`,
    sideAandCError: `The sum of Side A and Side C must be greater than Side B (${sideA_num} + ${sideC_num} <= ${sideB_num})`,
    sideBandCError: `The sum of Side B and Side C must be greater than Side A (${sideB_num} + ${sideC_num} <= ${sideA_num})`,
  };
  if (sideA_num + sideB_num <= sideC_num) {
    response.isValid = false;
    response.errorMessage = errorMessages.sideAandBError;
  }
  if (sideA_num + sideC_num <= sideB_num) {
    response.isValid = false;
    response.errorMessage = errorMessages.sideAandCError;
  }
  if (sideB_num + sideC_num <= sideA_num) {
    response.isValid = false;
    response.errorMessage = errorMessages.sideBandCError;
  }
  return response;
};

export default validateTriangleSides;
