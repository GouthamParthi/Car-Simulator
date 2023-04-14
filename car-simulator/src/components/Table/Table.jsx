import React from "react";
import styles from "./Table.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
function Table({
  data,
  columns,
  editButton,
  deleteButton,
  addButton,
  name,
  handleDelete,
  handleEdit,
  handleSave,
  handleInputChange,
}) {
  return (
    <div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((head, i) => {
                return (
                  <th className={styles.header} key={i}>
                    {head.header}
                  </th>
                );
              })}
              {addButton ? (
                <th className={styles.header}>Add Vehicle</th>
              ) : null}
              {editButton ? <th className={styles.header}>Edit</th> : null}
              {deleteButton ? <th className={styles.header}>Delete</th> : null}
            </tr>
          </thead>
          {data ? (
            <tbody className={styles.tableBody}>
              {data.map((row) => (
                <tr>
                  {columns.map((col, i) => (
                    <>
                      {/* we dont want add edit to id and no of vehicles */}
                      {row.isEdit &&
                      col.field !== "id" &&
                      col.field !== "vehicles" ? (
                        <td className={styles.tableBodydata} key={i}>
                          <form>
                            <input
                              name={col.field}
                              className={styles.input}
                              max={col.field === "speed" && 20}
                              defaultValue={
                                col.field === "vehicles"
                                  ? row[col.field].length
                                  : row[col.field]
                              }
                              onKeyUp={(e) => handleInputChange(e, col.field)}
                            />
                          </form>
                        </td>
                      ) : (
                        <td className={styles.tableBodydata} key={i}>
                          {col.field === "vehicles"
                            ? row[col.field].length
                            : row[col.field]}
                        </td>
                      )}
                    </>
                  ))}
                  {addButton ? (
                    <td className={styles.tableBodydata}>
                      <Link to={"/addvehicle"}>
                        <button className={styles.buttons}>
                          <AddCircleIcon fontSize="medium" />
                        </button>
                      </Link>
                    </td>
                  ) : null}
                  {editButton ? (
                    <td className={styles.tableBodydata}>
                      {row.isEdit ? (
                        <button
                          className={styles.buttons}
                          onClick={() => {
                            handleSave(row["id"]);
                          }}
                        >
                          <SaveIcon fontSize="medium" />
                          <h5>Save</h5>
                        </button>
                      ) : (
                        <button
                          className={styles.buttons}
                          onClick={() => {
                            handleEdit(row["id"]);
                          }}
                        >
                          <EditIcon fontSize="medium" />
                        </button>
                      )}
                    </td>
                  ) : null}

                  {deleteButton ? (
                    <td className={styles.tableBodydata}>
                      <button
                        className={styles.buttons}
                        onClick={() => {
                          handleDelete(row["id"]);
                        }}
                      >
                        <DeleteOutlineIcon fontSize="medium" />
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody
              style={{ color: "var(--color-white)", textAlign: "center" }}
              colspan="2"
              className={styles.nodata}
            >
              No {name} to show
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Table;
