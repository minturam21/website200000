
/**
 * Institutional Enquiry Service
 * Note: Digital portal transmission is currently in the integration phase.
 * All public enquiries are routed through telephone and campus visits.
 */
export const submitEnquiry = async (data: any): Promise<boolean> => {
  // Directly throw to trigger the 'Awaiting Integration' UI state in the Contact component
  throw new Error("Admissions portal synchronization pending.");
};
