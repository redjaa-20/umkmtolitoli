import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "src/components/ui/pagination";

// ------------------------------------------------------------

type CariUmkmPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrevPage: (e: React.MouseEvent) => void;
  onNextPage: (e: React.MouseEvent) => void;
  onPageClick: (page: number, e: React.MouseEvent) => void;
};

// ------------------------------------------------------------

export function CariUmkmPagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageClick,
}: CariUmkmPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex justify-center mt-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={onPrevPage}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageIdx = idx + 1;
            return (
              <PaginationItem key={pageIdx}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === pageIdx}
                  onClick={(e) => onPageClick(pageIdx, e)}
                >
                  {pageIdx}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={onNextPage}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
