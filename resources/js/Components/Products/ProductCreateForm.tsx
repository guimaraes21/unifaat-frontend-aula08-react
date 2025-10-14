import { useState, FormEvent } from "react";
import { ProductCreateFormProps } from "./Products.types";

export default function ProductCreateForm({ onCreate }: ProductCreateFormProps) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(""); // texto que aceita vírgula/ponto
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const changePriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value)
    }

    const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const onCreateHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMsg(null);

        if (!name.trim()) {
            setErrorMsg("Por favor, informe o nome do produto");
            return;
        }

        if (!price.trim()) {
            setErrorMsg("Por favor, informe o preço do produto");
            return;
        }

        const priceThousand = parsePriceToThousand(price);
        if (priceThousand === null || priceThousand <= 0) {
            setErrorMsg("Por favor, informe um preço válido");
            return;
        }

        if (onCreate) {
            try {
                await onCreate(name, price);
                setName("");
                setPrice("");
            } catch (error) {
                setErrorMsg((error as Error).message || "Erro ao cadastrar produto");
            }
        }
    };

    const parsePriceToThousand = (txt: string): number | null => {
        const clean = txt.replace(/\s/g, "");
        const normalized = clean.replace(",", ".").replace(/[^0-9.]/g, "");
        if (!normalized) return null;
        const n = Number(normalized);
        if (Number.isNaN(n)) return null;
        return Math.round(n * 1000);
    };

    return (
        <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                    <h5 className="card-title mb-3">Cadastrar produto</h5>

                    {errorMsg && (
                        <div className="alert alert-danger py-2">{errorMsg}</div>
                    )}

                    <form onSubmit={onCreateHandler} className="vstack gap-3">
                        <div>
                            <label htmlFor="prodName" className="form-label">Nome</label>
                            <input
                                id="prodName"
                                className="form-control"
                                placeholder="Ex.: Teclado Mecânico"
                                value={name}
                                onChange={changeNameHandler}
                            />
                        </div>

                        <div>
                            <label htmlFor="prodPrice" className="form-label">Preço</label>
                            <div className="input-group">
                                <span className="input-group-text">R$</span>
                                <input
                                    id="prodPrice"
                                    className="form-control"
                                    placeholder="Ex.: 199,90"
                                    value={price}
                                    onChange={changePriceHandler}
                                />
                            </div>
                            <div className="form-text">
                                Aceita vírgula ou ponto. Ex.: 199,90
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            <i className="fa-solid fa-plus me-2" aria-hidden="true"></i>
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </div>


    );
}
