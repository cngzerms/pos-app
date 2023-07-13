import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Detayı:</p>
                  <p className="text-green-600">{customer?.customerName}</p>
                  <p>Tesla Street 007</p>
                  <p>Toronto</p>
                  <p>CA 1509</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura:</p>
                  <p>The xS company</p>
                  <p>Tesla Street 007</p>
                  <p>Toronto</p>
                  <p>CA 1509</p>
                </div>
                <div className="text-md text-slate-500">
                  <div className="mb-2">
                    <p className="font-bold text-slate-700">Fatura Numarası:</p>
                    <p>000{Math.floor(Math.random() * 100000)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Veriliş Tarihi:</p>
                    <p>{customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div className="mb-2">
                    <p className="font-bold text-slate-700">Şartlar:</p>
                    <p>15 gün</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Vade:</p>
                    <p>2024-11-07</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5  text-left text-sm font-normal text-slate-700   sm:table-cell hidden "
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-left text-sm font-normal text-slate-700 sm:table-cell hidden "
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      colSpan="4"
                      className="py-3.5  text-left text-sm font-normal text-slate-700 sm:hidden  "
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700   sm:table-cell hidden "
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700   sm:table-cell hidden "
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-end text-sm font-normal text-slate-700   "
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim Fiyatı {item.price}$
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Birim Fiyatı {item.price}$
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price.toFixed(2)}$</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity).toFixed(2)}$</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Ara Toplam
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">Ara Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal}$
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        KDV %20
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">
                        KDV %{customer?.tax}
                      </p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        + {customer?.tax}$
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Genel Toplam
                      </span>
                    </th>

                    <th
                      className="text-left pt-4 sm:hidden "
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">Genel Toplam</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount}$
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    perferendis ex inventore in earum reiciendis, eius, minima
                    odit laboriosam accusamus error architecto quo natus.
                    Tempora cumque perferendis fugit vel accusamus. Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit. Sint ducimus at
                    beatae delectus, itaque dignissimos earum ullam deleniti
                    sapiente provident aliquam ipsa praesentium, maxime
                    distinctio exercitationem illo! Voluptatem, ea incidunt.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
